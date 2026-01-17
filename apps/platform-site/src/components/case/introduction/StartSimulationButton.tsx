import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const StartSimulationButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      className={cn(
        "h-16 w-full flex-row items-center justify-center gap-2",
        "rounded-2xl bg-primary"
      )}
      onClick={onClick}
    >
      <Play color={"white"} size={32} />
      <p className="text-white">Start Simlation</p>
    </button>
  );
};

export default StartSimulationButton;
