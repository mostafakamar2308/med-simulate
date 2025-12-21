import { ScrollView } from "react-native";
import React from "react";
import { BodySystem, ExaminationTechnique } from "@/lib/examination";

type ExaminationSelectorProps = {
  selectedTechnique: ExaminationTechnique;
  selectedSystem: BodySystem;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = () => {
  return <ScrollView></ScrollView>;
};

export default ExaminationActionSelector;
