import React, { useState } from "react";
import {
  AlertCircle,
  DoorOpen,
  X,
  Plus,
  Stethoscope,
  ListRestart,
  SendHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DecisionProps = {
  patientName: string;
  onSubmitDecision: (data: {
    primary: string;
    differentials: string[];
  }) => void;
};

const Decision: React.FC<DecisionProps> = ({
  patientName,
  onSubmitDecision,
}) => {
  const [primary, setPrimary] = useState("");
  const [differentials, setDifferentials] = useState<string[]>([""]);

  const addDifferential = () => setDifferentials([...differentials, ""]);

  const updateDifferential = (index: number, value: string) => {
    const updated = [...differentials];
    updated[index] = value;
    setDifferentials(updated);
  };

  const removeDifferential = (index: number) => {
    if (differentials.length > 1) {
      setDifferentials(differentials.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // Filter out empty strings before submitting
    const finalDiffs = differentials.filter((d) => d.trim() !== "");
    onSubmitDecision({ primary, differentials: finalDiffs });
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md",
          "h-32 w-full sm:w-40 hover:border-green-200",
        )}
      >
        <div className="rounded-full bg-green-50 p-3 text-green-600 transition-colors group-hover:bg-green-100">
          <DoorOpen className="h-6 w-6" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-green-700">
          Decide
        </span>
      </DialogTrigger>

      <DialogContent
        className="max-w-2xl p-0 overflow-hidden sm:rounded-2xl"
        showCloseButton={false}
      >
        {/* Header with high stakes styling */}
        <DialogHeader className="bg-slate-900 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-amber-400 h-5 w-5" />
                <DialogTitle className="text-xl font-bold">
                  Clinical Impression
                </DialogTitle>
              </div>
              <p className="text-slate-400 text-sm">
                Commit to a diagnosis for{" "}
                <span className="text-white font-medium">{patientName}</span>
              </p>
            </div>
            <DialogClose className="rounded-full hover:bg-white/10 p-1">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* 1. Primary Diagnosis */}
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Stethoscope size={14} className="text-green-500" />
              Primary Diagnosis
            </Label>
            <Input
              placeholder="What is the most likely diagnosis?"
              className="h-12 text-lg border-green-100 focus-visible:ring-green-500"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
          </div>

          <Separator className="opacity-50" />

          {/* 2. Differentials Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <ListRestart size={14} className="text-blue-500" />
                Differential Diagnoses
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={addDifferential}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs h-7"
              >
                <Plus size={14} className="mr-1" /> Add Item
              </Button>
            </div>

            <ScrollArea className="max-h-[200px] pr-4">
              <div className="space-y-3">
                {differentials.map((diff, index) => (
                  <div key={index} className="flex gap-2 group">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">
                        {index + 1}.
                      </span>
                      <Input
                        className="pl-8 bg-slate-50/50"
                        placeholder="Alternative possibility..."
                        value={diff}
                        onChange={(e) =>
                          updateDifferential(index, e.target.value)
                        }
                      />
                    </div>
                    {differentials.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-green-500"
                        onClick={() => removeDifferential(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer / Submission */}
        <div className="bg-slate-50 p-4 border-t flex items-center justify-between">
          <p className="text-[10px] text-slate-400 uppercase font-semibold max-w-[200px]">
            Submission is final and will conclude the clinical simulation.
          </p>
          <Button
            onClick={handleSubmit}
            disabled={!primary.trim()}
            className="bg-green-600 hover:bg-green-700 px-8 shadow-lg shadow-green-200"
          >
            Submit Decision
            <SendHorizontal size={16} className="ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Decision;
