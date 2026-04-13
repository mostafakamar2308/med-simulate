import React from "react";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history";
import ExaminationSuite from "@/components/case/simulation/examination";
import InvestigationsSuite from "./investigations";
import Decision from "@/components/case/decision";
import { ICase, IChat } from "@med-simulate/types";
import { TakenInvestigation } from "./investigations/types";

export type FinishSimulationPayload = {
  chat: IChat.Message[];
  findings: ICase.UserFinding[];
  investigations: TakenInvestigation[];
  diagnosis: { primary: string; differentials: string[] };
};

interface Props {
  medicalCase: ICase.FullCase;
  onFinish: (payload: FinishSimulationPayload) => void;
  // Pass down collected data and setters
  chatMessages: IChat.Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<IChat.Message[]>>;
  examinationFindings: ICase.UserFinding[];
  setExaminationFindings: (payload: ICase.UserFinding) => void;
  investigationsTaken: TakenInvestigation[];
  setInvestigationsTaken: React.Dispatch<
    React.SetStateAction<TakenInvestigation[]>
  >;
}

const SimulationActions: React.FC<Props> = ({
  medicalCase,

  onFinish,
  chatMessages,
  setChatMessages,
  examinationFindings,
  setExaminationFindings,
  investigationsTaken,
  setInvestigationsTaken,
}) => {
  const addInvestigation = (action: TakenInvestigation) => {
    setInvestigationsTaken((prev) => [...prev, action]);
  };

  const addFinding = (finding: ICase.UserFinding) => {
    setExaminationFindings(finding);
  };

  const addMessage = (message: IChat.Message) => {
    setChatMessages((prev) => [...prev, message]);
  };

  const onDecision = (diagnosis: {
    primary: string;
    differentials: string[];
  }) => {
    onFinish({
      chat: chatMessages,
      findings: examinationFindings,
      investigations: investigationsTaken,
      diagnosis,
    });
  };

  return (
    <div
      className={cn(
        "w-full max-w-xs grid grid-cols-2 flex-row flex-wrap justify-between gap-3 md:gap-8",
      )}
    >
      <HistorySimulation
        caseId={medicalCase.id}
        isTyping={false}
        addMessage={addMessage}
        messages={chatMessages}
        patientName={medicalCase.name}
      />
      <ExaminationSuite
        medicalCase={medicalCase}
        userFindings={examinationFindings}
        onFinding={addFinding}
      />
      <InvestigationsSuite
        takenInvestigations={investigationsTaken}
        onTakeInvestigation={addInvestigation}
        investigations={medicalCase.investigations}
      />
      <Decision onSubmitDecision={onDecision} patientName={medicalCase.name} />
    </div>
  );
};

export default SimulationActions;
