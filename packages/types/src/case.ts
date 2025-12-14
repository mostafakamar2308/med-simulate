import { IFilter } from ".";

export type Self = {
  id: string;
  title: string;
  complaint: string;
  category: CaseCategory;
  difficulty: CaseDifficulty;
  speciality: CaseSpeciality;
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;

  createdAt: string;
  updatedAt: string;
};

export type Row = {
  id: string;
  title: string;
  complaint: string;
  category: CaseCategory;
  difficulty: CaseDifficulty;
  speciality: CaseSpeciality;
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;

  created_at: Date;
  updated_at: Date;
};

export enum CaseDifficulty {
  Intern = 0,
  JuniorResident = 1,
  SeniorResident = 2,
  Specialist = 3,
}

export enum CaseCategory {
  ER = 0,
  Inpatient = 1,
  Outpatient = 2,
}

export enum CaseSpeciality {
  IM = 0,
  Pediatrics = 1,
  OBGYN = 2,
}

export enum Gender {
  Male = 0,
  Female = 1,
}

export type CaseVitalSigns = {
  id: string;
  caseId: string;
  respiratoryRate: number;
  heartRate: number;
  bloodPressure: string;
  o2Saturation: number;
  temperature: number;
};

export type CaseVitalSignsRow = {
  id: string;
  case_id: string;
  respiratory_rate: number;
  heart_rate: number;
  blood_pressure: string;
  o2_saturation: number;
  temperature: number;
};

export type CaseExamination = {
  id: string;
  caseId: string;
  templateId: string;
};

export type CaseExaminationRow = {
  id: string;
  case_id: string;
  template_id: string;
};

export type CaseFindings = {
  id: string;
  caseExaminationId: string;
  fieldId: string;
  valueId: string;
  notes?: string;
};

export type CaseFindingsRow = {
  id: string;
  case_examination_id: string;
  field_id: string;
  value_id: string;
  notes?: string;
};

export type CaseManagementProtocol = {
  id: string;
  caseId: string;
  immediateProtocol: string[];
  drugProtocol: Record<
    string,
    {
      name: string;
      dose: string;
      frequency: string;
      route: string;
    }
  >;
  nonDrugProtocol: string[];
  createdAt: string;
  updatedAt: string;
};

export type CaseManagementProtocolRow = {
  id: string;
  case_id: string;
  immediate_protocol: string[];
  drug_protocol: Record<
    string,
    {
      name: string;
      dose: string;
      frequency: string;
      route: string;
    }
  >;
  non_drug_protocol: string[];
  created_at: Date;
  updated_at: Date;
};

export type FindCasesApiQuery = IFilter.Pagination & {
  search?: string;
  filters?: {
    speciality?: CaseSpeciality[];
    category?: CaseCategory[];
    difficulty?: CaseDifficulty[];
  };
};

export type FindCasesQuery = FindCasesApiQuery;

export type FindCasesResponse = IFilter.Paginated<Self[]>;
