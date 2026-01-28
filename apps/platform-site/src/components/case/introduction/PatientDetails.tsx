import PatientAvatar from "@/components/case/PatientAvatar";
import { Card } from "@/components/ui/card";
import { genderMap } from "@/lib/constants";
import { ICase } from "@med-simulate/types";
import { AlertCircle } from "lucide-react";
import React from "react";

const PatientDetails: React.FC<{ medicalCase: ICase.FullCase }> = ({
  medicalCase,
}) => {
  return (
    <Card className="relative mb-6 gap-3 overflow-hidden border-none bg-white p-6 shadow-lg">
      <div className="relative z-10 mb-2 flex flex-row items-center gap-6">
        <div className="relative h-20 w-20">
          <PatientAvatar />
        </div>
        <div>
          <p className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Patient
          </p>
          <p className="font-display mb-1 text-2xl font-bold leading-none text-foreground">
            {medicalCase.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {medicalCase.age}y • {genderMap[medicalCase.gender]}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-start gap-3 rounded-xl border border-secondary bg-secondary/30 p-3">
        <div>
          <AlertCircle className="mt-0.5 h-6 w-6 text-destructive" />
        </div>
        <div className="flex-1 gap-2">
          <p className="text-xs font-bold uppercase text-destructive">
            Chief Complaint
          </p>
          <p className="shrink font-medium leading-5 text-foreground">
            {medicalCase.complaint}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PatientDetails;
