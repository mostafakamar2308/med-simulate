import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ICase } from "@med-simulate/types";
import { resolveBaseUrl } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: ICase.ExaminationArea;
  systemLabel: string;
  techniqueLabel: string;
  existingInterpretation?: string;
  onSubmit: (submission: {
    areaId: string;
    userInterpretation: string;
  }) => void;
}

export const AreaExaminationDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  area,
  systemLabel,
  techniqueLabel,
  existingInterpretation,
  onSubmit,
}) => {
  const finding = area.examinationFindings[0];
  const hasMedia = !!finding?.mediaFile;
  const [interpretation, setInterpretation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (open) {
      const hasExisting = !!existingInterpretation;
      setInterpretation(existingInterpretation || "");
      setSubmitted(hasExisting);
      setIsUpdate(hasExisting);
    } else {
      setInterpretation("");
      setSubmitted(false);
      setIsUpdate(false);
    }
  }, [open, area.id, existingInterpretation]);

  const handleSubmit = () => {
    if (!interpretation.trim()) {
      toast.error("Please write your interpretation");
      return;
    }
    onSubmit({
      areaId: area.id,
      userInterpretation: interpretation.trim(),
    });
    setSubmitted(true);
  };

  const handleSubmitNoMedia = () => {
    onSubmit({
      areaId: area.id,
      userInterpretation: finding.description,
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!hasMedia) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl p-4">
          <DialogHeader>
            <DialogTitle>
              {systemLabel} – {techniqueLabel}
            </DialogTitle>
            <DialogDescription>{area.label}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-semibold mb-2">Official finding:</p>
              <p className="text-sm">
                {finding?.description || "No description provided."}
              </p>
            </div>
            <div className="flex gap-2 justify-end items-center">
              <Button variant={"outline"} onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleSubmitNoMedia}>Add Finding</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-4">
        <DialogHeader>
          <DialogTitle>
            {systemLabel} – {techniqueLabel}
          </DialogTitle>
          <DialogDescription>{area.label}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/20 p-2">
            {finding.type === "img" && (
              <img
                src={`${resolveBaseUrl()}/assets/${finding.mediaFile!.diskName}`}
                alt="Finding media"
                className="max-h-64 w-full object-contain"
              />
            )}
            {finding.type === "video" && (
              <video
                src={`${resolveBaseUrl()}/assets/${finding.mediaFile!.diskName}`}
                controls
                className="max-h-64 w-full"
              />
            )}
            {finding.type === "audio" && (
              <audio
                src={`${resolveBaseUrl()}/assets/${finding.mediaFile!.diskName}`}
                controls
                className="w-full"
              />
            )}
          </div>

          {!submitted ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Your interpretation
                </label>
                <Textarea
                  value={interpretation}
                  onChange={(e) => setInterpretation(e.target.value)}
                  placeholder="Describe what you observe..."
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmit}>
                {isUpdate ? "Update finding" : "Submit finding"}
              </Button>
            </>
          ) : (
            <div className="space-y-3 rounded-lg bg-muted p-4">
              <p className="text-sm font-semibold">Official finding:</p>
              <p className="text-sm">
                {finding?.description || "No official description"}
              </p>
              <p className="text-sm font-semibold mt-2">Your interpretation:</p>
              <p className="text-sm italic">{interpretation}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Edit interpretation
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
