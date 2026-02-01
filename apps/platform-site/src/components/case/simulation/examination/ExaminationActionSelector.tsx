import React, { useEffect, useState } from "react";
import { ICase } from "@med-simulate/types";
import FindingViewer from "@/components/case/simulation/examination/FindingViewer";

type ExaminationSelectorProps = {
  selectedTechnique: ICase.ExaminationTechnique;
  selectedSystem: ICase.BodySystem;
  onFinding: (finding: ICase.ExaminationFinding) => void;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = ({
  selectedSystem,
  selectedTechnique,
  onFinding,
}) => {
  const [selectedTechniqueAreaFindings, setSelectedTechniqueAreaFindings] =
    useState<ICase.ExaminationFinding[] | null>(null);

  useEffect(() => {
    setSelectedTechniqueAreaFindings(null);
  }, [selectedSystem, selectedTechnique]);

  return (
    <div className="w-full space-y-2 px-2 max-h-1/2">
      <p className="text-xl font-bold text-muted-foreground">Available Areas</p>

      <div className="my-2 flex flex-col items-center w-full gap-4 px-2 h-full">
        <div className="grid grid-cols-2 gap-2">
          {selectedTechnique.examinationAreas.map((area) => (
            <button
              onClick={() => {
                setSelectedTechniqueAreaFindings(area.examinationFindings);
                area.examinationFindings.forEach((finding) => {
                  if (!finding.normal) onFinding(finding);
                });
              }}
              className="rounded-xl bg-primary p-4"
              key={area.id}
            >
              <p className="text-xl text-white">{area.label}</p>
            </button>
          ))}
        </div>
        <div className="mt-2 w-full flex items-center justify-center  h-full">
          {selectedTechniqueAreaFindings ? (
            <FindingViewer findings={selectedTechniqueAreaFindings} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExaminationActionSelector;
