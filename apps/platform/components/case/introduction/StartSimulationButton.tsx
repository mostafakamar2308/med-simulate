import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react-native";
import { Text } from "@/components/ui/text";

const StartSimulationButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      size="lg"
      className="sticky bottom-0 left-0 right-0 z-20 mx-auto h-14 w-full max-w-xs rounded-2xl text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-2xl"
      onPress={onClick}>
      <PlayCircle className="mr-2 !h-6 !w-6" />
      <Text>Start Simulation</Text>
    </Button>
  );
};

export default StartSimulationButton;
