import { Clock } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const CaseHeader: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <View className="relative mb-6">
      <View className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/40 blur-3xl" />
      <h1 className="font-display relative z-10 text-3xl font-bold text-foreground">{title}</h1>
      <View className="mt-2 flex flex-row items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Est. 10-15 mins</span>
      </View>
    </View>
  );
};

export default CaseHeader;
