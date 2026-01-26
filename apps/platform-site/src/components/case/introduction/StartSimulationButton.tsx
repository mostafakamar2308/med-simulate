import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const StartSimulationButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      className={cn(
        "h-16 flex p-2 px-8 flex-row items-center justify-center gap-2",
        "rounded-2xl bg-primary cursor-pointer",
        "fixed left-1/2 -translate-x-1/2 bottom-4",
      )}
      onClick={onClick}
    >
      <Play color={"white"} size={24} />
      <p className="text-white text-nowrap">Start Simlation</p>
    </button>
  );
};

export default StartSimulationButton;
