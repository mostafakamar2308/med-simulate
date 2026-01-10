import { View, Text } from "react-native";
import React, { useMemo } from "react";
import SimulationVitals from "@/components/case/simulation/SimulationVitals";
import PatientAvatar from "@/components/case/PatientAvatar";
import { ICase } from "@med-simulate/types";
import { cn } from "@/lib/utils";
import SimulationActions from "@/components/case/simulation/SimulationActions";

const Simulation: React.FC<{ caseData: ICase.Self }> = ({ caseData }) => {
  const environment = useMemo(() => {
    if (caseData.category === ICase.CaseCategory.ER) return "bg-red-700/10";
    if (caseData.category === ICase.CaseCategory.Inpatient) return "bg-blue-900/10";
    return "bg-green-500/10";
  }, [caseData]);

  return (
    <View className="relative flex-1 pt-4">
      <View className={cn("absolute left-0 top-0 -z-10 h-screen w-screen", environment)} />
      <View className={"flex-1 items-center justify-center gap-4"}>
        <View className="mb-4 items-center space-y-2 text-center">
          <Text className="font-display mb-1 text-2xl font-bold">{caseData.name}</Text>
          <Text className="rounded-full bg-white/50 px-3 py-1 text-lg text-muted-foreground backdrop-blur-sm">
            {caseData.complaint}
          </Text>
        </View>
        <View className="h-40 w-40">
          <PatientAvatar feelings="😣" />
        </View>
        <SimulationActions medicalCase={caseData} />
      </View>
      <SimulationVitals />
    </View>
  );
};

export default Simulation;
