// packages/types/src/grading.ts

export type HistoryGradingInput = {
  caseId: string;
  chatHistory: { role: "student" | "patient"; message: string }[];
};

export type HistoryGradingResponse = {
  score: number;
  feedback: string;
  missingQuestions: string[];
  communicationScore: number;
  explanationScore: number;
};

export type ExamGradingInput = {
  caseId: string;
  examinedAreas: { areaLabel: string; userInterpretation: string }[];
};

export type ExamGradingResponse = {
  score: number;
  feedback: string;
  examinedAreasCount: number;
  correctInterpretations: number;
  missedAreas: string[];
};

export type InvestigationsGradingInput = {
  caseId: string;
  orderedInvestigationIds: string[];
};

export type InvestigationsGradingResponse = {
  score: number;
  feedback: string;
  orderedCount: number;
  appropriateOrders: boolean;
  missingImportant: string[];
};

export type DiagnosisGradingInput = {
  caseId: string;
  finalDiagnosis: string;
  differentials?: string[];
};

export type DiagnosisGradingResponse = {
  score: number;
  feedback: string;
  isCorrect: boolean;
  differentialsQuality: string;
};
