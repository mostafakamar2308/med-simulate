import React from "react";
import { Play } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

const StartSimulationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Pressable
      className={cn(
        "h-16 w-full flex-row items-center justify-center gap-2",
        "rounded-2xl bg-primary"
      )}
      onPress={onClick}>
      <Play color={"white"} size={32} />
      <Text className="text-white">Start Simlation</Text>
    </Pressable>
  );
};

export default StartSimulationButton;
