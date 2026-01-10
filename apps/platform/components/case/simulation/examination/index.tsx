import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import ExaminationSuiteHeader from "@/components/case/simulation/examination/Header";
import SystemSelector from "@/components/case/simulation/examination/SystemSelector";
import { TechniqueSelector } from "@/components/case/simulation/examination/TechniqueSelector";
import { BodySystem, ExaminationTechniqueType } from "@med-simulate/types";
import { KeyboardScreen } from "@/components/layout/keyboardScreen";

const ExaminationSuite: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  complaint: string;
}> = ({ isOpen, onClose, complaint }) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<ExaminationTechniqueType | null>(null);

  useEffect(() => {
    setSelectedSystem(null);
    setSelectedTechnique(null);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <ExaminationSuiteHeader
        reset={() => {
          setSelectedSystem(null);
          setSelectedTechnique(null);
        }}
        close={onClose}
        onTechnique={!!selectedSystem}
        complaint={complaint}
      />
      <KeyboardScreen>
        <DialogContent className="flex h-[90vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
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
      </KeyboardScreen>
    </Dialog>
  );
};

export default ExaminationSuite;
