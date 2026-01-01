import React from "react";
import { ICase } from "@med-simulate/types";
import PatientDetails from "@/components/case/introduction/PatientDetails";
import CaseHeader from "@/components/case/introduction/Header";
import ScenarioDetails from "@/components/case/introduction/ScenarioDetails";
import { ScrollView, View } from "react-native";

const CaseIntroduction: React.FC<{ data: ICase.Self; startSimulation: () => void }> = ({
  data,
  startSimulation,
}) => {
  return (
    <View className="relative max-h-screen gap-2">
      <View className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
      <CaseHeader start={startSimulation} title={data.title} />
      <ScrollView>
        <PatientDetails medicalCase={data} />
        <ScenarioDetails medicalCase={data} />
      </ScrollView>
    </View>
  );
};

export default CaseIntroduction;
