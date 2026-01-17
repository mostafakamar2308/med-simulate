import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import ExaminationSuiteHeader from "@/components/case/simulation/examination/Header";
import SystemSelector from "@/components/case/simulation/examination/SystemSelector";
import { TechniqueSelector } from "@/components/case/simulation/examination/TechniqueSelector";
import {
  BodySystem,
  ExaminationTechniqueType,
  Finding,
} from "@med-simulate/types";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";

const ExaminationSuite: React.FC<{
  complaint: string;
  onFinding: (finding: Finding) => void;
}> = ({ onFinding, complaint }) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedTechnique, setSelectedTechnique] =
    useState<ExaminationTechniqueType | null>(null);

  useEffect(() => {
    setSelectedSystem(null);
    setSelectedTechnique(null);
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "items-center flex flex-col justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
          "p-8 border-white/50 bg-white/90",
        )}
      >
        <Stethoscope className="h-6 w-6 opacity-80" />
        <p className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
          Exam
        </p>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
        <ExaminationSuiteHeader
          reset={() => {
            setSelectedSystem(null);
            setSelectedTechnique(null);
          }}
          onTechnique={!!selectedSystem}
          complaint={complaint}
        />
        {!selectedSystem ? (
          <SystemSelector
            onChange={(system) => {
              setSelectedSystem(system);
              setSelectedTechnique(null);
            }}
            selected={selectedSystem}
          />
        ) : null}
        {selectedSystem ? (
          <TechniqueSelector
            selectedSystem={selectedSystem}
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
