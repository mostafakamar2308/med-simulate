import { categoryMap, difficultyMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle, MapPin } from "lucide-react-native";
import React from "react";

const ScenarioDetails: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  return (
    <div className="mb-24 space-y-6">
      <div className="prose prose-sm text-muted-foreground">
        <h3 className="font-display text-lg text-foreground">History</h3>
        <p className="indent-3">{medicalCase.briefHistory}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <MapPin className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Environment</span>
          </div>
          <p className="font-semibold">{categoryMap[medicalCase.category]}</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-amber-500">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Difficulty</span>
          </div>
          <p className="font-semibold">{difficultyMap[medicalCase.difficulty]}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
        <h3 className="font-display mb-2 font-bold text-primary">Objective</h3>
        <p className="indent-2 font-medium text-muted-foreground">{medicalCase.objective}</p>
      </div>
    </div>
  );
};

export default ScenarioDetails;
