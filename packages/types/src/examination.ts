export type BodySystem =
  | "general"
  | "cardiovascular"
  | "respiratory"
  | "abdomen"
  | "neurological"
  | "extremities";

export type ExaminationTechniqueType =
  | "inspect"
  | "palpate"
  | "auscultate"
  | "special";

export type ExaminationTechnique =
  | RegularExaminationTechnique
  | SpecialExaminationTechnique;

export type SpecialExaminationTechnique = {
  type: "special";
  label: string;
  value: string;
};

export type RegularExaminationTechnique = {
  type: Exclude<ExaminationTechniqueType, "special">;
  system: BodySystem;
  areas: Area[];
};

export type Area = {
  label: string;
  id: string;
  findings: Finding[];
};

export type FidningType = "img" | "audio" | "video" | "text";

export type Finding = {
  type: FidningType;
  url?: string;
  normal?: boolean;
  description: string;
};
