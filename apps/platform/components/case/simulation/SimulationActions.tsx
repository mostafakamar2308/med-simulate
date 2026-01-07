import { Text, TouchableOpacity, View } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history";
import { ICase, IChat } from "@med-simulate/types";
import ExaminationSuite from "@/components/case/simulation/examination";
import { ER_ACTION_CATEGORIES } from "@/lib/history";
import UrgentManagement from "@/components/case/simulation/urgentManangement";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";

const initialActions = {
  history: false,
  exam: false,
  investigations: false,
  consult: false,
  treatment: false,
  management: false,
  disposition: false,
};

const SimulationActions: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  const [actions, setActions] = useState(initialActions);
  const [chatMessages, setChatMessages] = useState<IChat.Chat>([]);
  const [actionsTaken, setActionsTaken] = useState<ActionTaken[]>([]);

  const AddAction = (action: ActionTaken) => {
    setActionsTaken((prev) => [...prev, action]);
  };

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

  return (
    <View className={cn("w-full max-w-xs flex-row flex-wrap justify-between gap-3")}>
      {displayedCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => openDialog(category.id)}
          className={cn(
            "items-center justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
            "h-32 w-32 border-white/50 bg-white/90"
          )}>
          <category.icon className="h-6 w-6 opacity-80" />
          <Text className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
            {category.label}
          </Text>
        </TouchableOpacity>
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
      />
      <UrgentManagement
        takenActions={actionsTaken}
        onActionTaken={AddAction}
        isOpen={actions.management}
        onClose={closeDialogs}
      />
    </View>
  );
};

export default SimulationActions;
