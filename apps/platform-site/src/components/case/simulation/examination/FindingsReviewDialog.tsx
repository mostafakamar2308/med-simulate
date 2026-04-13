// src/components/case/simulation/examination/FindingsReviewDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICase } from "@med-simulate/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  findings: ICase.UserFinding[];
}

export const FindingsReviewDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  findings,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-sm p-4 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Your Examination Findings</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {findings.map((f, idx) => (
              <div key={idx} className="border-b pb-3">
                <h3 className="font-semibold text-lg">
                  {f.systemLabel} – {f.techniqueLabel}: {f.areaLabel}
                </h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm font-medium">
                      Your interpretation:
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {f.userInterpretation}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">
                      Official finding:
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {f.officialDescription || "—"}
                    </p>
                  </div>
                  {f.hasMedia && (
                    <div className="text-xs text-muted-foreground">
                      📎 Media attached
                    </div>
                  )}
                </div>
              </div>
            ))}
            {findings.length === 0 && (
              <p className="text-center text-muted-foreground">
                No findings recorded yet.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
