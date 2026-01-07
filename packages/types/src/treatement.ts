export type Treatment = {
  id: string;
  name: string;
  result: TreatmentResult;
  role: "treatment";
};

export type TreatmentResult = {
  type: string;
  value: string;
  description: string;
};
