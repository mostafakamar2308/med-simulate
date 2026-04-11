import { ICase, IChat } from "@med-simulate/types";

export type PromptProps = {
  chatHistory: IChat.Message[];
};

export type InstructionsProps = {
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
