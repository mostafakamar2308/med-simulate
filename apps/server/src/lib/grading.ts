import { GoogleGenAI } from "@google/genai";
import { cases } from "@med-simulate/models";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY! });

// ---------- Zod Schemas for each section ----------
export const HistoryGradingSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  missingQuestions: z.array(z.string()),
  communicationScore: z.number().min(0).max(10),
  explanationScore: z.number().min(0).max(10),
});

export const ExamGradingSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  examinedAreasCount: z.number(),
  correctInterpretations: z.number(),
  missedAreas: z.array(z.string()),
});

export const InvestigationsGradingSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  orderedCount: z.number(),
  appropriateOrders: z.boolean(),
  missingImportant: z.array(z.string()),
});

export const DiagnosisGradingSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  isCorrect: z.boolean(),
  differentialsQuality: z.string(),
});

export type HistoryGrading = z.infer<typeof HistoryGradingSchema>;
export type ExamGrading = z.infer<typeof ExamGradingSchema>;
export type InvestigationsGrading = z.infer<typeof InvestigationsGradingSchema>;
export type DiagnosisGrading = z.infer<typeof DiagnosisGradingSchema>;

// ---------- Fetch case context (official data) ----------
export async function getCaseContext(caseId: string) {
  const medicalCase = await cases.findCaseById(caseId);
  if (!medicalCase) throw new Error("Case not found");

  // Extract all examination areas with official descriptions
  const allFindings: { areaLabel: string; officialDescription: string }[] = [];
  for (const system of medicalCase.bodySystems) {
    for (const technique of system.examinationTechniques) {
      for (const area of technique.examinationAreas) {
        const finding = area.examinationFindings[0];
        allFindings.push({
          areaLabel: area.label,
          officialDescription: finding?.description || "No description",
        });
      }
    }
  }

  return {
    title: medicalCase.title,
    complaint: medicalCase.complaint,
    briefHistory: medicalCase.briefHistory,
    objective: medicalCase.objective,
    diagnosis: medicalCase.diagnosis,
    investigations: medicalCase.investigations.map((inv: any) => ({
      id: inv.id,
      label: inv.label,
    })),
    examinationFindings: allFindings,
  };
}

// ---------- Generic Gemini caller ----------
export async function callGeminiGrading<T>(
  systemInstruction: string,
  userPrompt: string,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash", // cheapest model
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(schema),
    },
  });
  const text = response.text;
  if (!text) throw new Error("Empty response from Gemini");
  const parsed = JSON.parse(text);
  return schema.parse(parsed);
}
