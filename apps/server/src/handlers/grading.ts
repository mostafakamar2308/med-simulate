import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getCaseContext,
  callGeminiGrading,
  HistoryGradingSchema,
  ExamGradingSchema,
  InvestigationsGradingSchema,
  DiagnosisGradingSchema,
} from "@/lib/grading";
import { grading } from "@med-simulate/models";

// ---------- Input schemas ----------
const historyInputSchema = z.object({
  caseId: z.string(),
  chatHistory: z.array(
    z.object({
      role: z.enum(["doctor", "patient"]),
      message: z.string(),
    }),
  ),
});

const examInputSchema = z.object({
  caseId: z.string(),
  examinedAreas: z.array(
    z.object({
      areaLabel: z.string(),
      userInterpretation: z.string(),
    }),
  ),
});

const investigationsInputSchema = z.object({
  caseId: z.string(),
  orderedInvestigationIds: z.array(z.string()),
});

const diagnosisInputSchema = z.object({
  caseId: z.string(),
  finalDiagnosis: z.string(),
  differentials: z.array(z.string()).optional(),
});

// ---------- System instructions (with placeholders for checklist) ----------
const getHistorySystemInstruction = (context: any) => `
You are an expert medical educator. Grade the student's history‑taking skills and give him feedback as if you are talking to him directly.

CASE CONTEXT:
- Complaint: ${context.complaint}
- Brief history: ${context.briefHistory}
- Objective: ${context.objective}

GRADING RUBRIC (0-10):
- 0-3: Poor, missing critical questions
- 4-6: Average, some good questions but several omissions
- 7-8: Good, most relevant questions asked
- 9-10: Excellent, comprehensive and empathetic

History Grading Item Checklist: 
For a complete Full History the student should ask about every item.
If the objective isn't a full history just check against the section needed.
- Complaint: Ask about complaints, when did it start, where it started.
- Present History: Analysis of each Complaint (where, when, what relieves or increases it, course of each complaint), Any other symptoms related to complaint, Any other system affection, Any drugs or medications taken.
- Past History: Surgical History, Blood Transfusion history, Similar Conditions, other diseases he had in the past.
- Familly History: Diseases like this in the family, Consanguinity, other familial Disorders.
- Obstetric History: Type of delivery, Delivery complications, Time of Delivery.
- Explain the situation to the patient


EVALUATION CRITERIA:
1. Questions asked: completeness and relevance (based on case)
2. Communication skills: clarity, rapport, empathy
3. Explanation to guardian: did the student explain findings/plan appropriately?

Return JSON with: score, feedback, missingQuestions (list of important questions not asked), communicationScore, explanationScore.
`;

const getExamSystemInstruction = (context: any) => `
Official findings per area:
${context.examinationFindings.map((f: { areaLabel: string; officialDescription: string; normal: boolean }) => `- ${f.areaLabel}: ${f.officialDescription}, this is ${f.normal ? "normal" : "not normal, user should comment on this"}`).join("\n")}

Grade the student's physical examination and give him feedback as if you are talking to him directly:
- Which areas were examined vs. missed?
  if the areas missed are normal don't focus too much on it in the score
- How well does the student's interpretation match the official finding?
- Score (0-10), feedback, count of correct interpretations, list of missed areas.
`;

const getInvestigationsSystemInstruction = (context: any) => `
Available investigations and give him feedback as if you are talking to him directly:
${context.investigations.map((inv: { label: string }) => `- ${inv.label}`).join("\n")}

Grade the student's choice of investigations:
- Did they order appropriate tests?
- Are any critical tests missing?
- Score (0-10), feedback, ordered count, whether orders were appropriate, list of missing important tests.
`;

const getDiagnosisSystemInstruction = (context: any) => `
Official diagnosis: ${context.diagnosis}
Official differential: ${context.differential}

Grade the student's final diagnosis and differentials and give him feedback as if you are talking to him directly:
- Is the final diagnosis correct (exact or acceptably close)?
- Quality of differentials (relevance, completeness).
- Score (0-10), feedback, boolean isCorrect, differentialsQuality string.
`;

// ---------- Handlers ----------
export async function gradeHistory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { caseId, chatHistory } = historyInputSchema.parse(req.body);
    const studentId = (req as any).user?.id;
    if (!studentId) return res.status(401).json({ error: "Unauthorized" });

    const context = await getCaseContext(caseId);
    const systemInstruction = getHistorySystemInstruction(context);
    const userPrompt = `CHAT TRANSCRIPT (doctor vs patient/guardian):\n${chatHistory.map((m) => `${m.role.toUpperCase()}: ${m.message}`).join("\n")}`;

    const result = await callGeminiGrading(
      systemInstruction,
      userPrompt,
      HistoryGradingSchema,
    );

    await grading.upsertAttempt({
      studentId,
      caseId,
      section: "HISTORY",
      score: result.score,
      feedback: result.feedback,
      rawResponse: result,
      missingItems: result.missingQuestions,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function gradeExam(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { caseId, examinedAreas } = examInputSchema.parse(req.body);
    const studentId = (req as any).user?.id;
    if (!studentId) return res.status(401).json({ error: "Unauthorized" });

    const context = await getCaseContext(caseId);
    const systemInstruction = getExamSystemInstruction(context);

    const userPrompt = `Student examined these areas:\n${examinedAreas.map((a) => `${a.areaLabel}: "${a.userInterpretation}"`).join("\n")}`;

    const result = await callGeminiGrading(
      systemInstruction,
      userPrompt,
      ExamGradingSchema,
    );

    await grading.upsertAttempt({
      studentId,
      caseId,
      section: "EXAM",
      score: result.score,
      feedback: result.feedback,
      rawResponse: result,
      missingItems: result.missedAreas,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function gradeInvestigations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { caseId, orderedInvestigationIds } = investigationsInputSchema.parse(
      req.body,
    );
    const studentId = (req as any).user?.id;
    if (!studentId) return res.status(401).json({ error: "Unauthorized" });

    const context = await getCaseContext(caseId);
    const orderedLabels = context.investigations
      .filter((inv) => orderedInvestigationIds.includes(inv.id))
      .map((inv) => inv.label);

    const systemInstruction = getInvestigationsSystemInstruction(context);
    const userPrompt = `Student ordered these investigations:\n${orderedLabels.join(", ") || "None"}`;

    const result = await callGeminiGrading(
      systemInstruction,
      userPrompt,
      InvestigationsGradingSchema,
    );

    await grading.upsertAttempt({
      studentId,
      caseId,
      section: "INVESTIGATIONS",
      score: result.score,
      feedback: result.feedback,
      rawResponse: result,
      missingItems: result.missingImportant,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function gradeDiagnosis(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      caseId,
      finalDiagnosis,
      differentials = [],
    } = diagnosisInputSchema.parse(req.body);
    const studentId = (req as any).user?.id;
    if (!studentId) return res.status(401).json({ error: "Unauthorized" });

    const context = await getCaseContext(caseId);
    const systemInstruction = getDiagnosisSystemInstruction(context);
    const userPrompt = `Student's final diagnosis: "${finalDiagnosis}"\nDifferentials: ${differentials.join(", ") || "None"}`;

    const result = await callGeminiGrading(
      systemInstruction,
      userPrompt,
      DiagnosisGradingSchema,
    );

    await grading.upsertAttempt({
      studentId,
      caseId,
      section: "DIAGNOSIS",
      score: result.score,
      feedback: result.feedback,
      rawResponse: result,
      isCorrect: result.isCorrect,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
