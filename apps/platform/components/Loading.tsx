import { Text } from "@/components/ui/text";
import { Stethoscope } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View className="flex flex-1 items-center justify-center gap-4 text-primary">
      <Stethoscope className="h-10 w-10 animate-pulse" />
      <Text>{text}</Text>
    </View>
  );
};

export default Loading;
