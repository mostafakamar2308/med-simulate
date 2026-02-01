import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history";
import { IExamination, ICase, IChat } from "@med-simulate/types";
import ExaminationSuite from "@/components/case/simulation/examination";
import Decision, { DecisionItem } from "@/components/case/decision";
import InvestigationsSuite from "./investigations";
import { TakenInvestigation } from "./investigations/types";

export type FinishSimulation = (payload: {
  chat: IChat.Chat;
  findings: IExamination.Finding[];
  investigations: TakenInvestigation[];
  decision: DecisionItem;
}) => void;

const SimulationActions: React.FC<{
  medicalCase: ICase.FullCase;
  finishSimulation: FinishSimulation;
}> = ({ medicalCase, finishSimulation }) => {
  const [chatMessages, setChatMessages] = useState<IChat.Chat>([]);
  const [examinationFindings, setExaminationationFindings] = useState<
    ICase.ExaminationFinding[]
  >([]);
  const [investigationsTaken, setInvestigationsTaken] = useState<
    TakenInvestigation[]
  >([]);

  const addInvestigation = useCallback((action: TakenInvestigation) => {
    setInvestigationsTaken((prev) => [...prev, action]);
  }, []);

  const AddFinding = useCallback((finding: ICase.ExaminationFinding) => {
    setExaminationationFindings((prev) => [...prev, finding]);
  }, []);

  const addMessage = useCallback((message: IChat.Message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const onDecision = useCallback(
    (decision: DecisionItem) => {
      finishSimulation({
        decision,
        chat: chatMessages,
        investigations: investigationsTaken,
        findings: examinationFindings,
      });
    },
    [finishSimulation],
  );

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
      <ExaminationSuite medicalCase={medicalCase} onFinding={AddFinding} />
      <InvestigationsSuite
        takenInvestigations={investigationsTaken}
        onTakeInvestigation={addInvestigation}
        investigations={medicalCase.investigations}
      />
      <Decision onDecision={onDecision} patientName={medicalCase.name} />
    </div>
  );
};

export default SimulationActions;
