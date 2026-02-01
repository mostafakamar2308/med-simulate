import React from "react";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { InvestigationTakenProps } from "@/components/case/simulation/investigations/types";
import { ResultContent } from "./InvestigaionToTake";

const InvestigationsTaken: React.FC<InvestigationTakenProps> = ({
  takenInvestigations,
}) => {
  if (takenInvestigations.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
        <div className="bg-muted p-4 rounded-full mb-4">
          <Clock size={32} />
        </div>
        <p className="text-lg font-medium text-gray-900">No results yet</p>
        <p className="text-sm">Order investigations to see results here.</p>
      </div>
    );
  }

  // Reverse to show newest first
  const sorted = [...takenInvestigations].reverse();

  return (
    <ScrollArea className="h-full pr-4">
      <div className="relative ml-4 border-l-2 border-dashed border-gray-200 pb-10">
        {sorted.map((inv) => (
          <div
            key={`${inv.id}-${inv.timeStamp}`}
            className="relative mb-8 pl-8"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white"></div>

            <div className="flex flex-col gap-2">
              {/* Header info */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-blue-900">
                  {inv.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  •{" "}
                  {new Date(inv.timeStamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Result Card */}
              <Card className="overflow-hidden border-none shadow-sm bg-white ring-1 ring-gray-200/75">
                <div className="p-4">
                  <ResultContent result={inv.investigationResult} />
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default InvestigationsTaken;
