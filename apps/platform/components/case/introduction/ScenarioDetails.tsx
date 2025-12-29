import { categoryMap, difficultyMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle, MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const ScenarioDetails: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  return (
    <View className="mb-24 space-y-6">
      <View className="prose prose-sm text-muted-foreground">
        <Text className="font-display text-lg text-foreground">History</Text>
        <Text className="indent-3">{medicalCase.briefHistory}</Text>
      </View>

      <View className="grid grid-cols-2 gap-4">
        <View className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <View className="mb-2 flex items-center gap-2 text-primary">
            <MapPin className="h-4 w-4" />
            <Text className="text-xs font-bold uppercase">Environment</Text>
          </View>
          <Text className="font-semibold">{categoryMap[medicalCase.category]}</Text>
        </View>

        <View className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <View className="mb-2 flex items-center gap-2 text-amber-500">
            <AlertCircle className="h-4 w-4" />
            <Text className="text-xs font-bold uppercase">Difficulty</Text>
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
