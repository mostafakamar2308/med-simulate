import React, { useMemo } from "react";
import SimulationVitals from "@/components/case/simulation/SimulationVitals";
import PatientAvatar from "@/components/case/PatientAvatar";
import { ICase } from "@med-simulate/types";
import { cn } from "@/lib/utils";
import SimulationActions, {
  FinishSimulation,
} from "@/components/case/simulation/SimulationActions";

const Simulation: React.FC<{
  caseData: ICase.Self;
  finishSimulation: FinishSimulation;
}> = ({ caseData, finishSimulation }) => {
  const environment = useMemo(() => {
    if (caseData.category === ICase.CaseCategory.ER) return "bg-red-700/10";
    if (caseData.category === ICase.CaseCategory.Inpatient)
      return "bg-blue-900/10";
    return "bg-green-500/10";
  }, [caseData]);

  return (
    <div className="relative flex flex-col flex-1 h-full pt-4 border">
      <div className={cn("absolute left-0 top-0 -z-10", environment)} />
      <div className={"flex-1 flex flex-col items-center justify-center gap-4"}>
        <div className="mb-4 items-center space-y-2 text-center">
          <p className="font-display mb-1 text-2xl font-bold">
            {caseData.name}
          </p>
          <p className="rounded-full bg-white/50 px-3 py-1 text-lg text-muted-foreground backdrop-blur-sm">
            {caseData.complaint}
          </p>
        </div>
        <div className="h-40 w-40">
          <PatientAvatar feelings="😣" />
        </div>
        <SimulationActions
          finishSimulation={finishSimulation}
          medicalCase={caseData}
        />
      </div>
      <SimulationVitals />
    </div>
  );
};

export default Simulation;
