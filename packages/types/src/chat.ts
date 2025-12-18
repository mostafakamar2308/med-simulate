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

export type sendMessageResponse = {
  response: string;
};
