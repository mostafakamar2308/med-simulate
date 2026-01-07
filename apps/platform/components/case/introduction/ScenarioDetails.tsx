import { categoryMap, difficultyMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle, MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const ScenarioDetails: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  return (
    <View className="mb-24 gap-4">
      <View className="px-4">
        <Text className="font-display text-lg text-foreground">History</Text>
        <Text className="prose prose-sm indent-3 text-muted-foreground">
          {medicalCase.briefHistory}
        </Text>
      </View>

      <View className="grid grid-cols-2 gap-4">
        <View className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <View className="mb-2 flex flex-row items-center gap-2">
            <MapPin size={16} color={"lightgreen"} />
            <Text className="text-xs font-bold uppercase text-primary">Environment</Text>
          </View>
          <Text className="font-semibold">{categoryMap[medicalCase.category]}</Text>
        </View>

        <View className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <View className="mb-2 flex flex-row items-center gap-2">
            <AlertCircle size="16" color={"#f59e0b"} />
            <Text className="text-xs font-bold uppercase text-amber-500">Difficulty</Text>
          </View>
          <Text className="font-semibold">{difficultyMap[medicalCase.difficulty]}</Text>
        </View>
      </View>

      <View className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
        <Text className="font-display mb-2 font-bold text-primary">Objective</Text>
        <Text className="indent-2 font-medium text-muted-foreground">{medicalCase.objective}</Text>
      </View>
    </View>
  );
};

export default ScenarioDetails;
