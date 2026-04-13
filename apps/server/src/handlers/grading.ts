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
You are an expert medical educator. Grade the student's history‑taking skills.

CASE CONTEXT:
- Complaint: ${context.complaint}
- Brief history: ${context.briefHistory}
- Objective: ${context.objective}

GRADING RUBRIC (0-10):
- 0-3: Poor, missing critical questions
- 4-6: Average, some good questions but several omissions
- 7-8: Good, most relevant questions asked
- 9-10: Excellent, comprehensive and empathetic

EVALUATION CRITERIA:
1. Questions asked: completeness and relevance (based on case)
2. Communication skills: clarity, rapport, empathy
3. Explanation to guardian: did the student explain findings/plan appropriately?

Return JSON with: score, feedback, missingQuestions (list of important questions not asked), communicationScore, explanationScore.
`;

const getExamSystemInstruction = (context: any) => `
Official findings per area:
${context.examinationFindings.map((f: { areaLabel: string; officialDescription: string }) => `- ${f.areaLabel}: ${f.officialDescription}`).join("\n")}

Grade the student's physical examination:
- Which areas were examined vs. missed?
- How well does the student's interpretation match the official finding?
- Score (0-10), feedback, count of correct interpretations, list of missed areas.
`;

const getInvestigationsSystemInstruction = (context: any) => `
Available investigations:
${context.investigations.map((inv: { label: string }) => `- ${inv.label}`).join("\n")}

Grade the student's choice of investigations:
- Did they order appropriate tests?
- Are any critical tests missing?
- Score (0-10), feedback, ordered count, whether orders were appropriate, list of missing important tests.
`;

const getDiagnosisSystemInstruction = (context: any) => `
Official diagnosis: ${context.diagnosis}

Grade the student's final diagnosis and differentials:
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
    const userPrompt = `CHAT TRANSCRIPT (student vs patient/guardian):\n${chatHistory.map((m) => `${m.role.toUpperCase()}: ${m.message}`).join("\n")}`;

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
