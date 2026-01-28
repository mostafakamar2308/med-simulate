import { IFilter } from "@/index";

export type Case = {
  id: string;
  title: string;
  complaint: string;
  category: Category;
  difficulty: Difficulty;
  speciality: Speciality;
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  briefHistory: string;
  objective: string;
  actor: string;

  createdAt: Date;
  updatedAt: Date;
};

export type FullCase = Case & {
  bodySystems: BodySystem[];
};

export enum Difficulty {
  Intern = 0,
  JuniorResident = 1,
  SeniorResident = 2,
  Specialist = 3,
}

export enum Category {
  ER = 0,
  Inpatient = 1,
  Outpatient = 2,
}

export enum Speciality {
  IM = 0,
  Pediatrics = 1,
  OBGYN = 2,
}

export enum Gender {
  Male = 0,
  Female = 1,
}

// remember if changed to change prisma schema
export type BodySystemLabel =
  | "General"
  | "Cardiovascular"
  | "Respiratory"
  | "Abdomen"
  | "Neurological"
  | "Extremities";

export type BodySystem = {
  id: string;
  label: BodySystemLabel;

  caseId: string;
  examinationTechniques: ExaminationTechnique[];
};

// remember if changed to change prisma schema
export type ExaminationTechniqueLabel =
  | "Inspect"
  | "Palpate"
  | "Auscultate"
  | "Percuss";

export type ExaminationTechnique = {
  id: string;
  label: ExaminationTechniqueLabel;
  bodySystemId: string;
  examinationAreas: ExaminationArea[];
};

export type ExaminationArea = {
  id: string;
  label: string;
  examinationTechniqueId: string;
  examinationFindings: ExaminationFinding[];
};
// remember if changed to change prisma schema
export type ExaminationFidningType = "img" | "audio" | "video" | "text";

export type ExaminationFinding = {
  id: string;
  type: ExaminationFidningType;
  normal?: boolean;
  description: string;
  examinationAreaId: string;
};

export type FindCasesApiQuery = IFilter.Pagination & {
  search?: string;
  filters?: {
    speciality?: Speciality[];
    category?: Category[];
    difficulty?: Difficulty[];
  };
};

export type FindCasesQuery = FindCasesApiQuery;

export type FindCasesResponse = IFilter.Paginated<Case[]>;
