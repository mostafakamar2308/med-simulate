import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { ICase } from "@med-simulate/types";
import { Pressable } from "@rn-primitives/slot";
import React from "react";
import { View } from "react-native";

const specialityMap: Record<ICase.CaseSpeciality, string> = {
  [ICase.CaseSpeciality.IM]: "Internal Medicine",
  [ICase.CaseSpeciality.Pediatrics]: "Pediatrics",
  [ICase.CaseSpeciality.OBGYN]: "OB/GYN",
};

const categoryMap: Record<ICase.CaseCategory, string> = {
  [ICase.CaseCategory.ER]: "Emergency",
  [ICase.CaseCategory.Outpatient]: "Clinic",
  [ICase.CaseCategory.Inpatient]: "Ward",
};

const difficultyMap: Record<ICase.CaseDifficulty, string> = {
  [ICase.CaseDifficulty.Intern]: "Intern",
  [ICase.CaseDifficulty.JuniorResident]: "Junior Resident",
  [ICase.CaseDifficulty.SeniorResident]: "Senior Resident",
  [ICase.CaseDifficulty.Specialist]: "Specialist",
};

const genderMap: Record<ICase.Gender, string> = {
  [ICase.Gender.Male]: "Male",
  [ICase.Gender.Female]: "Female",
};

const MedicalCase: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  return (
    <Pressable className="my-2">
      <Card className="group cursor-pointer border-border/50 bg-white p-4 transition-shadow hover:shadow-lg">
        <View className="mb-3 flex items-start justify-between">
          <View className="flex flex-row gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-50 font-normal text-blue-700 hover:bg-blue-100">
              <Text>{specialityMap[medicalCase.speciality]}</Text>
            </Badge>
            <Badge variant="outline" className="border-border font-normal text-muted-foreground">
              <Text>{difficultyMap[medicalCase.difficulty]}</Text>
            </Badge>
          </View>
        </View>

        <Text className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
          {medicalCase.title}
        </Text>
        <Text className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {medicalCase.complaint}
        </Text>

        <View className="flex flex-row items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
          <Text>
            {medicalCase.name}, {medicalCase.age}y {genderMap[medicalCase.gender]}
          </Text>
          <Text className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
            {categoryMap[medicalCase.category]}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};

export default MedicalCase;
