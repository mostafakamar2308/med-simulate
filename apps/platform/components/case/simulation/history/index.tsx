import React, { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import HistoryHeader from "@/components/case/simulation/history/Header";
import ChatMessage from "@/components/case/simulation/history/Message";
import SendMessage from "@/components/case/simulation/history/SendMessage";
import { IChat } from "@med-simulate/types";
import { useSendMessage } from "@med-simulate/api/hooks";

const HistorySimulation: React.FC<{
  isOpen: boolean;
  isTyping: boolean;
  patientName: string;
  messages: IChat.Message[];
  caseId: string;
  onClose: () => void;
  addMessage: (message: IChat.Message) => void;
}> = ({ isOpen, caseId, patientName, onClose, messages, addMessage }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const onSendMessageSuccess = useCallback(
    (data: IChat.SendMessageResponse) => {
      addMessage({ text: data.text, sender: "patient" });
    },
    [addMessage]
  );

  const sendMessageMutation = useSendMessage({
    onSuccess: onSendMessageSuccess,
    onError: () => {},
  });

  const sendMessage = useCallback(
    (message: string) => {
      addMessage({ text: message, sender: "doctor" });

      sendMessageMutation.mutate({
        chat: [...messages, { text: message, sender: "doctor" }],
        caseId,
      });
    },
    [messages, caseId, addMessage, sendMessageMutation]
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="flex h-[80vh] flex-col p-0">
        <HistoryHeader patientName={patientName} onClose={onClose} />

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-slate-50 px-4 pt-4"
          contentContainerStyle={{ paddingBottom: 12 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
          {messages.map((msg, idx) => (
            <ChatMessage message={msg} key={idx} />
          ))}

          {sendMessageMutation.isPending ? <TypingIndicator /> : null}
        </ScrollView>

        <SendMessage handleSend={sendMessage} />
      </DialogContent>
    </Dialog>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <View className="my-2 flex-row gap-1 self-start rounded-2xl rounded-bl-none border border-border/50 bg-white px-4 py-3 shadow-sm">
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" />
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-150" />
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-300" />
    </View>
  );
};

export default HistorySimulation;
