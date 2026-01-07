export type Consultation = {
  id: string;
  role: "consultation";
  name: string;
  result: ConsultationResult;
};

export type ConsultationResult = {
  type: string;
  value: string;
  description: string;
};
