import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ICase } from "@med-simulate/types";

type SystemSelectorProps = {
  selected: ICase.BodySystem | null;
  systems: ICase.BodySystem[];
  onChange: (system: ICase.BodySystem) => void;
};

const SystemSelector: React.FC<SystemSelectorProps> = ({
  selected,
  systems,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 mt-4 px-2 gap-1">
      {systems.map((system) => {
        const isSelected = selected?.id === system.id;
        return (
          <Button
            variant={"outline"}
            key={system.id}
            onClick={() => onChange(system)}
            className={cn(
              "flex h-fit w-full flex-col items-center justify-center rounded-2xl p-4",
              isSelected
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary/50"
                : "border border-border bg-white",
            )}
          >
            <p className="mb-2 text-3xl">{system.icon}</p>
            <p className="font-display text-sm font-bold">{system.label}</p>
          </Button>
        );
      })}
    </div>
  );
};

export default SystemSelector;
