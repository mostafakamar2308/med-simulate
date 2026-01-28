import { ICase } from "@med-simulate/types";

export const specialityMap: Record<ICase.Difficulty, string> = {
  [ICase.Difficulty.IM]: "Internal Medicine",
  [ICase.Difficulty.Pediatrics]: "Pediatrics",
  [ICase.Difficulty.OBGYN]: "OB/GYN",
};

export const categoryMap: Record<ICase.Category, string> = {
  [ICase.Category.ER]: "Emergency",
  [ICase.Category.Outpatient]: "Clinic",
  [ICase.Category.Inpatient]: "Ward",
};

export const difficultyMap: Record<ICase.Difficulty, string> = {
  [ICase.Difficulty.Intern]: "Intern",
  [ICase.Difficulty.JuniorResident]: "Junior Resident",
  [ICase.Difficulty.SeniorResident]: "Senior Resident",
  [ICase.Difficulty.Specialist]: "Specialist",
};

export const genderMap: Record<ICase.Gender, string> = {
  [ICase.Gender.Male]: "Male",
  [ICase.Gender.Female]: "Female",
};
