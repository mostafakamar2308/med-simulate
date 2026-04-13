import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import { ChevronLeft, ClipboardList, X } from "lucide-react";
import React from "react";

const ExaminationSuiteHeader: React.FC<{
  complaint: string;
  onTechnique: boolean;
  userFindingsCount: number;
  onReview: () => void;
  reset: () => void;
}> = ({ userFindingsCount, onReview, complaint, onTechnique, reset }) => {
  return (
    <DialogHeader className="z-10 flex-row items-center justify-between border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      {onTechnique ? (
        <div>
          <button onClick={reset}>
            <ChevronLeft size={32} />
          </button>
        </div>
      ) : null}

      <div>
        <p className="font-display text-lg font-bold text-foreground">
          Physical Examination
        </p>
        <p className="text-sm text-muted-foreground">{complaint}</p>
        {userFindingsCount > 0 && (
          <Button variant="outline" size="sm" onClick={onReview}>
            <ClipboardList className="h-4 w-4 mr-1" /> Review (
            {userFindingsCount})
          </Button>
        )}
      </div>
      <DialogClose>
        <X width={32} height={32} />
      </DialogClose>
    </DialogHeader>
  );
};

export default ExaminationSuiteHeader;
