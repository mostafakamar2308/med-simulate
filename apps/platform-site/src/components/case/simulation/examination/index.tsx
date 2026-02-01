import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import ExaminationSuiteHeader from "@/components/case/simulation/examination/Header";
import SystemSelector from "@/components/case/simulation/examination/SystemSelector";
import { TechniqueSelector } from "@/components/case/simulation/examination/TechniqueSelector";
import { ICase } from "@med-simulate/types";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";

const ExaminationSuite: React.FC<{
  medicalCase: ICase.FullCase;
  onFinding: (finding: ICase.ExaminationFinding) => void;
}> = ({ onFinding, medicalCase }) => {
  const [selectedSystem, setSelectedSystem] = useState<ICase.BodySystem | null>(
    null,
  );
  const [selectedTechnique, setSelectedTechnique] =
    useState<ICase.ExaminationTechnique | null>(null);

  useEffect(() => {
    setSelectedSystem(null);
    setSelectedTechnique(null);
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md",
          "h-32 w-full sm:w-40 hover:border-emerald-200",
        )}
      >
        <div className="rounded-full bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-100">
          <Stethoscope className="h-6 w-6" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-emerald-700">
          Exam
        </span>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
        <ExaminationSuiteHeader
          reset={() => {
            setSelectedSystem(null);
            setSelectedTechnique(null);
          }}
          onTechnique={!!selectedSystem}
          complaint={medicalCase.complaint}
        />
        {!selectedSystem ? (
          <SystemSelector
            onChange={(system) => {
              setSelectedSystem(system);
              setSelectedTechnique(null);
            }}
            systems={medicalCase.bodySystems}
            selected={selectedSystem}
          />
        ) : null}
        {selectedSystem ? (
          <TechniqueSelector
            selectedSystem={selectedSystem}
            techniques={selectedSystem.examinationTechniques}
            onChange={setSelectedTechnique}
            onFinding={onFinding}
            selectedTechnique={selectedTechnique}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ExaminationSuite;
