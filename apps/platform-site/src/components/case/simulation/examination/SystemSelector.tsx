import React from "react";
import { cn } from "@/lib/utils";
import { BODY_SYSTEMS } from "@/lib/examination";
import { Button } from "@/components/ui/button";
import { BodySystem } from "@med-simulate/types";

type SystemSelectorProps = {
  selected: BodySystem | null;
  onChange: (system: BodySystem) => void;
};

const SystemSelector: React.FC<SystemSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap flex-row mt-4 px-2 gap-1">
      {BODY_SYSTEMS.map((system) => {
        const isSelected = selected === system.id;
        return (
          <Button
            variant={"outline"}
            key={system.id}
            onClick={() => onChange(system.id)}
            className={cn(
              "flex h-fit w-[45%] flex-col items-center justify-center rounded-2xl p-4",
              isSelected
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary/50"
                : "border border-border bg-white"
            )}
          >
            <p className="mb-2 text-3xl">{system.icon}</p>
            <p className="font-display text-sm font-bold">{system.label}</p>
            <p className="mt-1 text-sm leading-tight opacity-60">
              {system.description}
            </p>
          </Button>
        );
      })}
    </div>
  );
};

export default SystemSelector;
