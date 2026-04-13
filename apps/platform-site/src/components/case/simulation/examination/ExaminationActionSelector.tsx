import React, { useState } from "react";
import { ICase } from "@med-simulate/types";
import { AreaExaminationDialog } from "./AreaExaminationDialog";
import { cn } from "@/lib/utils";

interface Props {
  selectedTechnique: ICase.ExaminationTechnique;
  selectedSystem: ICase.BodySystem;
  onFinding: (finding: ICase.ExaminationFinding) => void;
  onUserFinding: (finding: ICase.UserFinding) => void;
  userFindings: ICase.UserFinding[];
}

const ExaminationActionSelector: React.FC<Props> = ({
  selectedSystem,
  selectedTechnique,
  onFinding,
  onUserFinding,
  userFindings,
}) => {
  const [selectedArea, setSelectedArea] =
    useState<ICase.ExaminationArea | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const examinedAreaIds = new Set(userFindings.map((f) => f.areaId));

  const handleAreaClick = (area: ICase.ExaminationArea) => {
    setSelectedArea(area);
    setDialogOpen(true);
  };

  const handleSubmit = (submission: {
    areaId: string;
    userInterpretation: string;
  }) => {
    const area = selectedTechnique.examinationAreas.find(
      (a) => a.id === submission.areaId,
    );
    if (!area) return;
    const finding = area.examinationFindings[0];
    const userFinding: ICase.UserFinding = {
      areaId: area.id,
      areaLabel: area.label,
      techniqueLabel: selectedTechnique.label,
      systemLabel: selectedSystem.label,
      userInterpretation: submission.userInterpretation,
      officialDescription: finding?.description || "",
      hasMedia: !!finding?.mediaFile,
      mediaUrl: finding?.mediaFile
        ? `/assets/${finding.mediaFile.diskName}`
        : undefined,
      submittedAt: new Date(),
    };
    onUserFinding(userFinding);
    if (finding && !finding.normal) onFinding(finding);
    setDialogOpen(false);
  };

  return (
    <div className="w-full space-y-4 px-2">
      <p className="text-xl font-bold text-muted-foreground">Available Areas</p>
      <div className="grid grid-cols-2 gap-3">
        {selectedTechnique.examinationAreas.map((area) => {
          const isExamined = examinedAreaIds.has(area.id);
          return (
            <button
              key={area.id}
              onClick={() => handleAreaClick(area)}
              className={cn(
                "rounded-xl p-4 text-left transition-all",
                isExamined
                  ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200"
                  : "bg-primary text-white hover:bg-primary/90",
              )}
            >
              <p className="text-lg font-medium">{area.label}</p>
              {area.examinationFindings[0]?.mediaFile && (
                <span className="text-xs opacity-80">📷 Media available</span>
              )}
            </button>
          );
        })}
      </div>
      {selectedArea && (
        <AreaExaminationDialog
          key={selectedArea.id}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          area={selectedArea}
          systemLabel={selectedSystem.label}
          techniqueLabel={selectedTechnique.label}
          existingInterpretation={
            userFindings.find((f) => f.areaId === selectedArea.id)
              ?.userInterpretation
          }
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ExaminationActionSelector;
