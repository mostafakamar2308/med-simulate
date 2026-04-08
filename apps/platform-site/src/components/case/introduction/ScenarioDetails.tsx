import { categoryMap, difficultyMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle, MapPin } from "lucide-react";
import React from "react";

const ScenarioDetails: React.FC<{ medicalCase: ICase.FullCase }> = ({
  medicalCase,
}) => {
  return (
    <div className="mb-24 gap-4">
      <div className="px-4">
        <p className="font-display text-lg text-foreground">History</p>
        <p className="prose prose-sm indent-3 text-muted-foreground">
          {medicalCase.briefHistory}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-row items-center gap-2">
            <MapPin size={16} color={"lightgreen"} />
            <p className="text-xs font-bold uppercase text-primary">
              Environment
            </p>
          </div>
          <p className="font-semibold">{categoryMap[medicalCase.category]}</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-row items-center gap-2">
            <AlertCircle size="16" color={"#f59e0b"} />
            <p className="text-xs font-bold uppercase text-amber-500">
              Difficulty
            </p>
          </div>
          <p className="font-semibold">
            {difficultyMap[medicalCase.difficulty]}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
        <p className="font-display mb-2 font-bold text-primary">Objective</p>
        <p className="indent-2 font-medium text-muted-foreground">
          {medicalCase.objective}
        </p>
      </div>
    </div>
  );
};

export default ScenarioDetails;
