import { ICase, IChat } from "@med-simulate/types";

export type PromptProps = {
  medicalCase: ICase.FullCase;
  chatHistory: IChat.Message[];
  vitals?: {
    respiratoryRate: number;
    heartRate: number;
    bloodPressure: string;
    o2Saturation: number;
    temperature: number;
  };
};
