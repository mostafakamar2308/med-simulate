import React, { useEffect, useMemo, useState } from "react";
import {
  BodySystem,
  ExaminationTechnique,
  ExaminationTechniqueType,
  Finding,
  SpecialExaminationTechnique,
} from "@med-simulate/types";
import {
  EXAMINATION_TECHNIQUES,
  SPECIAL_SIGNS,
} from "@/constants/examinations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FindingViewer from "@/components/case/simulation/examination/FindingViewer";

type ExaminationSelectorProps = {
  selectedTechnique: ExaminationTechniqueType;
  selectedSystem: BodySystem;
  onFinding: (finding: Finding) => void;
};

const ExaminationActionSelector: React.FC<ExaminationSelectorProps> = ({
  selectedSystem,
  selectedTechnique,
  onFinding,
}) => {
  const [
    selectedRegularTechniqueAreaFindings,
    setSelectedRegularTechniqueAreaFindings,
  ] = useState<Finding[] | null>(null);
  const [selectedSpecialTechnique, setSelectedSpecialTechnique] =
    useState<SpecialExaminationTechnique | null>(null);

  useEffect(() => {
    setSelectedRegularTechniqueAreaFindings(null);
    setSelectedSpecialTechnique(null);
  }, [selectedSystem, selectedTechnique]);

  const techniques: ExaminationTechnique[] = useMemo(() => {
    if (selectedTechnique === "special") return SPECIAL_SIGNS;

    return EXAMINATION_TECHNIQUES.filter(
      (item) =>
        item.type === selectedTechnique && item.system === selectedSystem,
    );
  }, [selectedTechnique, selectedSystem]);

  if (techniques.length === 0)
    return (
      <div>
        <p>No Techinques here Yet</p>
      </div>
    );

  if (selectedTechnique === "special")
    return (
      <div className="w-full px-2">
        <p className="text-xl font-bold text-muted-foreground">
          Available Actions
        </p>
        {selectedSpecialTechnique ? (
          <p
            className={cn(
              "my-2 w-screen mx-auto max-w-xs rounded-lg border px-2 py-4 text-center text-2xl font-bold",
              selectedSpecialTechnique?.value === "positive"
                ? "border-primary bg-green-600/80 text-white"
                : "border-destructive bg-destructive/80 text-white",
            )}
          >
            <p className="font-normal">{selectedSpecialTechnique?.label}:</p>{" "}
            {selectedSpecialTechnique?.value}
          </p>
        ) : null}
        <div className="flex flex-col items-center mt-2 gap-2">
          {techniques.map((item, idx) => (
            <Button
              onClick={() => {
                setSelectedSpecialTechnique(
                  item.type === "special" ? item : null,
                );
                setSelectedRegularTechniqueAreaFindings(null);
              }}
              className="w-3/4 border-primary"
              variant={"outline"}
              key={idx}
            >
              <p>{item.type === "special" && item.label}</p>
            </Button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="w-full space-y-2 px-2 max-h-1/2">
      <p className="text-xl font-bold text-muted-foreground">Available Areas</p>

      <div className="my-2 flex flex-col items-center w-full gap-4 px-2 h-full">
        <div className="flex flex-row flex-wrap gap-2">
          {techniques.map((item) => {
            return (
              item.type !== "special" &&
              item.areas.map((area) => (
                <button
                  onClick={() => {
                    setSelectedRegularTechniqueAreaFindings(area.findings);
                    setSelectedSpecialTechnique(null);
                    area.findings.forEach((finding) => {
                      if (!finding.normal) onFinding(finding);
                    });
                  }}
                  className="rounded-xl bg-primary p-4"
                  key={area.id}
                >
                  <p className="text-xl text-white">{area.label}</p>
                </button>
              ))
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-center  h-full">
          {selectedRegularTechniqueAreaFindings ? (
            <FindingViewer findings={selectedRegularTechniqueAreaFindings} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExaminationActionSelector;
