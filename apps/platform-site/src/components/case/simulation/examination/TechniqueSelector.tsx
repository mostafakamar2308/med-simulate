import { cn } from "@/lib/utils";
import { getSystemLabel, TECHNIQUES } from "@/lib/examination";
import { Button } from "@/components/ui/button";
import ExaminationActionSelector from "@/components/case/simulation/examination/ExaminationActionSelector";
import {
  BodySystem,
  ExaminationTechniqueType,
  Finding,
} from "@med-simulate/types";

type TechniqueSelectorProps = {
  selectedTechnique: ExaminationTechniqueType | null;
  selectedSystem: BodySystem;
  onChange: (technique: ExaminationTechniqueType | "special") => void;
  onFinding: (finding: Finding) => void;
};

export function TechniqueSelector({
  selectedTechnique,
  selectedSystem,
  onChange,
  onFinding,
}: TechniqueSelectorProps) {
  return (
    <div className="my-4 overflow-auto flex flex-col w-full items-center gap-3 px-2">
      <p className="flex flex-row gap-2 text-2xl font-semibold text-foreground">
        {getSystemLabel(selectedSystem).icon}{" "}
        {getSystemLabel(selectedSystem).label}
      </p>
      <div className="my-4 grid grid-cols-2 gap-3 w-full px-2">
        {TECHNIQUES.map((tech) => {
          const Icon = tech.icon;
          const isSelected = selectedTechnique === tech.id;
          return (
            <Button
              key={tech.id}
              onClick={() => onChange(tech.id)}
              className={cn(
                "flex h-fit w-full flex-col items-center justify-center gap-2 rounded-2xl p-3",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "border border-border text-secondary-foreground bg-white",
              )}
            >
              <Icon className="h-6 w-6" />
              <p className="font-display text-sm font-bold">{tech.label}</p>
              <p className="w-full text-center text-sm opacity-75">
                {tech.description}
              </p>
            </Button>
          );
        })}
      </div>
      {selectedTechnique && selectedSystem ? (
        <ExaminationActionSelector
          onFinding={onFinding}
          selectedSystem={selectedSystem}
          selectedTechnique={selectedTechnique}
        />
      ) : null}
    </div>
  );
}
