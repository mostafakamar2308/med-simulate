import React, { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history";
import { Finding, ICase, IChat } from "@med-simulate/types";
import ExaminationSuite from "@/components/case/simulation/examination";
import { ER_ACTION_CATEGORIES } from "@/lib/history";
import UrgentManagement from "@/components/case/simulation/urgentManangement";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";
import Decision, { DecisionItem } from "@/components/case/decision";

const initialActions = {
  history: false,
  exam: false,
  investigations: false,
  consult: false,
  treatment: false,
  management: false,
  decision: false,
};

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
  const [actions, setActions] = useState(initialActions);
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

  const isUrgent = useMemo(
    () => medicalCase.category !== ICase.CaseCategory.Outpatient,
    [medicalCase.category]
  );

  const displayedCategories = useMemo(() => ER_ACTION_CATEGORIES, [isUrgent]);
  const addMessage = useCallback((message: IChat.Message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const closeDialogs = useCallback(() => setActions(initialActions), []);

  const openDialog = useCallback(
    (id: string) => setActions((prev) => ({ ...prev, [id]: true })),
    []
  );

  const onDecision = useCallback(
    (decision: DecisionItem) => {
      finishSimulation({
        decision,
        chat: chatMessages,
        actions: actionsTaken,
        findings: examinationFindings,
      });
      closeDialogs();
    },
    [closeDialogs]
  );

  return (
    <div
      className={cn("w-full max-w-xs flex-row flex-wrap justify-between gap-3")}
    >
      {displayedCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => openDialog(category.id)}
          className={cn(
            "items-center justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
            "h-32 w-32 border-white/50 bg-white/90"
          )}
        >
          <category.icon className="h-6 w-6 opacity-80" />
          <p className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
            {category.label}
          </p>
        </button>
      ))}
      <HistorySimulation
        caseId={medicalCase.id}
        isOpen={actions.history}
        onClose={closeDialogs}
        isTyping={false}
        addMessage={addMessage}
        messages={chatMessages}
        patientName={medicalCase.name}
      />
      <ExaminationSuite
        complaint={medicalCase.complaint}
        isOpen={actions.exam}
        onClose={closeDialogs}
        onFinding={AddFinding}
      />
      <UrgentManagement
        takenActions={actionsTaken}
        onActionTaken={AddAction}
        isOpen={actions.management}
        onClose={closeDialogs}
      />
      <Decision
        onDecision={onDecision}
        patientName={medicalCase.name}
        isOpen={actions.decision}
        onClose={closeDialogs}
      />
    </div>
  );
};

export default SimulationActions;
