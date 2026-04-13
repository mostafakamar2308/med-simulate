import React, { useMemo } from "react";
import SimulationVitals from "@/components/case/simulation/SimulationVitals";
import PatientAvatar from "@/components/case/PatientAvatar";
import { ICase, IChat } from "@med-simulate/types";
import { cn } from "@/lib/utils";
import SimulationActions, {
  FinishSimulationPayload,
} from "./SimulationActions";
import { TakenInvestigation } from "./investigations/types";

interface Props {
  caseData: ICase.FullCase;
  onFinish: (payload: FinishSimulationPayload) => void;
  chatMessages: IChat.Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<IChat.Message[]>>;
  examinationFindings: ICase.UserFinding[];
  setExaminationFindings: (payload: ICase.UserFinding) => void;
  investigationsTaken: TakenInvestigation[];
  setInvestigationsTaken: React.Dispatch<
    React.SetStateAction<TakenInvestigation[]>
  >;
}

const Simulation: React.FC<Props> = ({
  caseData,
  onFinish,
  chatMessages,
  setChatMessages,
  examinationFindings,
  setExaminationFindings,
  investigationsTaken,
  setInvestigationsTaken,
}) => {
  const environment = useMemo(() => {
    if (caseData.category === ICase.Category.ER) return "bg-red-700/10";
    if (caseData.category === ICase.Category.Inpatient) return "bg-blue-900/10";
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
          medicalCase={caseData}
          onFinish={onFinish}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          examinationFindings={examinationFindings}
          setExaminationFindings={setExaminationFindings}
          investigationsTaken={investigationsTaken}
          setInvestigationsTaken={setInvestigationsTaken}
        />
      </div>
      <SimulationVitals />
    </div>
  );
};

export default Simulation;
