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
  id: string;
  text: string;
  sender: 'user' | 'system';
  caseId: string;
  chatId: string;

  createdAt: string;
  updatedAt: string;
};

export type MessageRow = {
  id: string;
  text: string;
  sender: 'user' | 'system';
  case_id: string;
  chat_id: string;
  created_at: Date;
  updated_at: Date;
};
