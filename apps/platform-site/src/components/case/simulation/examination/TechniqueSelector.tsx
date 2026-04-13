import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ICase } from "@med-simulate/types";
import ExaminationActionSelector from "./ExaminationActionSelector";

type Props = {
  selectedTechnique: ICase.ExaminationTechnique | null;
  selectedSystem: ICase.BodySystem;
  techniques: ICase.ExaminationTechnique[];
  onChange: (technique: ICase.ExaminationTechnique) => void;
  onUserFinding: (finding: ICase.UserFinding) => void;
  userFindings: ICase.UserFinding[];
};

export function TechniqueSelector({
  selectedTechnique,
  selectedSystem,
  techniques,
  onChange,
  onUserFinding,
  userFindings,
}: Props) {
  return (
    <div className="my-4 overflow-auto h-full flex flex-col w-full items-center gap-3 px-2">
      <p className="flex flex-row gap-2 text-2xl font-semibold text-foreground">
        {selectedSystem.icon} {selectedSystem.label}
      </p>
      <div className="my-4 grid grid-cols-2 gap-3 w-full px-2">
        {techniques.map((tech) => {
          const isSelected = selectedTechnique?.id === tech.id;
          return (
            <Button
              key={tech.id}
              onClick={() => onChange(tech)}
              className={cn(
                "flex h-fit w-full flex-col items-center justify-center gap-2 rounded-2xl p-3",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "border border-border text-secondary-foreground bg-white",
              )}
            >
              <span className="text-xl">{tech.icon}</span>
              <p className="font-display text-sm font-bold">{tech.label}</p>
            </Button>
          );
        })}
      </div>
      {selectedTechnique && selectedSystem ? (
        <ExaminationActionSelector
          onUserFinding={onUserFinding}
          selectedSystem={selectedSystem}
          selectedTechnique={selectedTechnique}
          userFindings={userFindings}
        />
      ) : null}
    </div>
  );
}
