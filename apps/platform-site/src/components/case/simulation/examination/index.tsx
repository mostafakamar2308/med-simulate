import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import ExaminationSuiteHeader from "@/components/case/simulation/examination/Header";
import SystemSelector from "@/components/case/simulation/examination/SystemSelector";
import { TechniqueSelector } from "@/components/case/simulation/examination/TechniqueSelector";
import {
  BodySystem,
  ExaminationTechniqueType,
  Finding,
} from "@med-simulate/types";

const ExaminationSuite: React.FC<{
  isOpen: boolean;
  complaint: string;
  onClose: () => void;
  onFinding: (finding: Finding) => void;
}> = ({ isOpen, onClose, onFinding, complaint }) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedTechnique, setSelectedTechnique] =
    useState<ExaminationTechniqueType | null>(null);

  useEffect(() => {
    setSelectedSystem(null);
    setSelectedTechnique(null);
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <ExaminationSuiteHeader
        reset={() => {
          setSelectedSystem(null);
          setSelectedTechnique(null);
        }}
        close={onClose}
        onTechnique={!!selectedSystem}
        complaint={complaint}
      />
      <DialogContent className="flex h-[90vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
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
