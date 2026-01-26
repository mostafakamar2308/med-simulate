import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history/index-v2";
import { Finding, ICase, IChat } from "@med-simulate/types";
import ExaminationSuite from "@/components/case/simulation/examination";
import UrgentManagement from "@/components/case/simulation/urgentManangement";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";
import Decision, { DecisionItem } from "@/components/case/decision";

export type FinishSimulation = (payload: {
  chat: IChat.Chat;
  findings: Finding[];
  actions: ActionTaken[];
  decision: DecisionItem;
}) => void;

const SimulationActions: React.FC<{
  medicalCase: ICase.Self;
  finishSimulation: FinishSimulation;
}> = ({ medicalCase, finishSimulation }) => {
  const [chatMessages, setChatMessages] = useState<IChat.Chat>([]);
  const [examinationFindings, setExaminationationFindings] = useState<
    Finding[]
  >([]);
  const [actionsTaken, setActionsTaken] = useState<ActionTaken[]>([]);

  const AddAction = useCallback((action: ActionTaken) => {
    setActionsTaken((prev) => [...prev, action]);
  }, []);

  const AddFinding = useCallback((finding: Finding) => {
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
        actions: actionsTaken,
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
      <ExaminationSuite
        complaint={medicalCase.complaint}
        onFinding={AddFinding}
      />
      <UrgentManagement takenActions={actionsTaken} onActionTaken={AddAction} />
      <Decision onDecision={onDecision} patientName={medicalCase.name} />
    </div>
  );
};

export default SimulationActions;
