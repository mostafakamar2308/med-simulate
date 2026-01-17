import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import { ChevronLeft, X } from "lucide-react";
import React from "react";

const ExaminationSuiteHeader: React.FC<{
  complaint: string;
  onTechnique: boolean;
  reset: () => void;
}> = ({ complaint, onTechnique, reset }) => {
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
      </div>
      <DialogClose>
        <X width={32} height={32} />
      </DialogClose>
    </DialogHeader>
  );
};

export default ExaminationSuiteHeader;
