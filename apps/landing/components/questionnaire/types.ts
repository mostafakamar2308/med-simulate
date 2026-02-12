export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  text: string;
  score: number;
}

export interface QuestionnaireResponse {
  questionId: number;
  selectedIdx: number;
}

export interface UserInfo {
  name: string;
  university: string;
  whatsapp: string;
}

export interface QuestionnaireResult {
  totalScore: number;
  category: 'high' | 'medium' | 'low';
  feedback: string;
  action: string;
}
