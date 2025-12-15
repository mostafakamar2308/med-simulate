import { ICase } from "@med-simulate/types";

export const specialityMap: Record<ICase.CaseSpeciality, string> = {
  [ICase.CaseSpeciality.IM]: "Internal Medicine",
  [ICase.CaseSpeciality.Pediatrics]: "Pediatrics",
  [ICase.CaseSpeciality.OBGYN]: "OB/GYN",
};

export const categoryMap: Record<ICase.CaseCategory, string> = {
  [ICase.CaseCategory.ER]: "Emergency",
  [ICase.CaseCategory.Outpatient]: "Clinic",
  [ICase.CaseCategory.Inpatient]: "Ward",
};

export const difficultyMap: Record<ICase.CaseDifficulty, string> = {
  [ICase.CaseDifficulty.Intern]: "Intern",
  [ICase.CaseDifficulty.JuniorResident]: "Junior Resident",
  [ICase.CaseDifficulty.SeniorResident]: "Senior Resident",
  [ICase.CaseDifficulty.Specialist]: "Specialist",
};

export const genderMap: Record<ICase.Gender, string> = {
  [ICase.Gender.Male]: "Male",
  [ICase.Gender.Female]: "Female",
};
