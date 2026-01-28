export type Self = {
  id: string;
  caseId: string;
  userId: string;

  createdAt: string;
  updatedAt: string;
};

export type Row = {
  id: string;
  case_id: string;
  user_id: string;

  created_at: Date;
  updated_at: Date;
};

export type Message = {
  sender: "doctor" | "patient";
  text: string;
};

export type Chat = Message[];

export type SendMessageResponse = {
  text: string;
  emotion: string;
};

export type StreamChunk =
  | { type: "text"; content: string }
  | { type: "done" }
  | { type: "error"; message?: string }
  // Base64 string for audio
  | { type: "audio"; content: string };
