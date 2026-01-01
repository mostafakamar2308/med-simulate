import React from "react";
import { PlayCircle } from "lucide-react-native";
import { Pressable } from "react-native";
import { cn } from "@/lib/utils";

const StartSimulationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Pressable
      className={cn(
        "h-16 w-16",
        "flex-row items-center justify-center gap-2",
        "rounded-2xl bg-primary"
      )}
      onPress={onClick}>
      <PlayCircle color={"white"} size={32} />
    </Pressable>
  );
};

export default StartSimulationButton;
