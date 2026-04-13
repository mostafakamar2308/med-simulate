import { ICase, IChat } from ".";

export type HistoryGradingInput = {
  caseId: string;
  chatHistory: { role: "doctor" | "patient"; message: string }[];
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

export interface SubmissionData {
  chat: IChat.Message[];
  examinedAreas: ICase.UserFinding[];
  orderedInvestigations: ICase.TakenInvestigation[];
  diagnosis: {
    primary: string;
    differentials: string[];
  };
}
