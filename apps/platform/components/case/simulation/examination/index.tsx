import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import ExaminationSuiteHeader from "@/components/case/simulation/examination/Header";
import SystemSelector from "@/components/case/simulation/examination/SystemSelector";
import { TechniqueSelector } from "@/components/case/simulation/examination/TechniqueSelector";
import { BodySystem, ExaminationTechniqueType } from "@med-simulate/types";

const ExaminationSuite: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  complaint: string;
}> = ({ isOpen, onClose, complaint }) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<ExaminationTechniqueType | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              setSelectedTechnique("inspect");
            }}
            selected={selectedSystem}
          />
        ) : null}
        {selectedSystem ? (
          <TechniqueSelector
            selectedSystem={selectedSystem}
            onChange={setSelectedTechnique}
            selectedTechnique={selectedTechnique}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ExaminationSuite;
