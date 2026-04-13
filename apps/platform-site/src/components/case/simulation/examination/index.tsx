// src/components/case/simulation/examination/ExaminationSuite.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ICase } from "@med-simulate/types";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";
import ExaminationSuiteHeader from "./Header";
import SystemSelector from "./SystemSelector";
import { TechniqueSelector } from "./TechniqueSelector";
import { FindingsReviewDialog } from "./FindingsReviewDialog";

interface Props {
  medicalCase: ICase.FullCase;
  onFinding: (finding: ICase.ExaminationFinding) => void;
}

const ExaminationSuite: React.FC<Props> = ({ medicalCase, onFinding }) => {
  const [open, setOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<ICase.BodySystem | null>(
    null,
  );
  const [selectedTechnique, setSelectedTechnique] =
    useState<ICase.ExaminationTechnique | null>(null);
  const [userFindings, setUserFindings] = useState<ICase.UserFinding[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);

  const addOrUpdateFinding = (newFinding: ICase.UserFinding) => {
    setUserFindings((prev) => {
      const existingIndex = prev.findIndex(
        (f) => f.areaId === newFinding.areaId,
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = newFinding;
        return updated;
      }
      return [...prev, newFinding];
    });
  };

  const reset = () => {
    setSelectedSystem(null);
    setSelectedTechnique(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
            reset={reset}
            onTechnique={!!selectedSystem}
            complaint={medicalCase.complaint}
            userFindingsCount={userFindings.length}
            onReview={() => setReviewOpen(true)}
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
              onUserFinding={addOrUpdateFinding}
              userFindings={userFindings}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <FindingsReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        findings={userFindings}
      />
    </>
  );
};

export default ExaminationSuite;
