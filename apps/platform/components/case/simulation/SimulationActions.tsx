import { Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HistorySimulation from "@/components/case/simulation/history";
import { ICase, IChat } from "@med-simulate/types";
import ExaminationSuite from "@/components/case/simulation/examination";
import { ACTION_CATEGORIES } from "@/lib/history";

const initialActions = {
  history: false,
  exam: false,
  investigations: false,
  consult: false,
  treatment: false,
  disposition: false,
};

const SimulationActions: React.FC<{ medicalCase: ICase.Self }> = ({ medicalCase }) => {
  const [actions, setActions] = useState(initialActions);
  const [chatMessages, setChatMessages] = useState<IChat.Chat>([]);

  const addMessage = useCallback((message: IChat.Message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const closeDialogs = useCallback(() => setActions(initialActions), []);

  const openDialog = useCallback(
    (id: string) => setActions((prev) => ({ ...prev, [id]: true })),
    []
  );

  return (
    <View className="!grid w-full !grid-cols-2 justify-between gap-8">
      {ACTION_CATEGORIES.map((action) => (
        <Button
          onPress={() => openDialog(action.id)}
          key={action.id}
          className={cn("border", action.color)}>
          <action.icon className="group-opacity-100 mb-1 h-8 w-8 opacity-80 transition-opacity" />
          <Text className="group-opacity-100 text-base font-bold uppercase tracking-wider opacity-80">
            {action.label}
          </Text>
        </Button>
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
    </View>
  );
};

export default SimulationActions;
