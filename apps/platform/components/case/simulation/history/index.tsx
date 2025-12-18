import React, { useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollView } from "react-native";
import HistoryHeader from "@/components/case/simulation/history/Header";
import ChatMessage from "@/components/case/simulation/history/Message";
import { View } from "react-native";
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
  const scrollViewRef: React.Ref<ScrollView> = useRef(null);

  const onSendMessageSuccess = useCallback((data: IChat.SendMessageResponse) => {
    addMessage({ text: data.text, sender: "patient" });
  }, []);

  const sendMessageMutation = useSendMessage({
    onSuccess: onSendMessageSuccess,
    onError: () => {},
  });

  const sendMessage = useCallback((message: string) => {
    addMessage({ text: message, sender: "doctor" });
    sendMessageMutation.mutate({
      chat: [...messages, { text: message, sender: "doctor" }],
      caseId,
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
        <HistoryHeader patientName={patientName} />

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          className="flex-1 flex-col overflow-y-auto bg-slate-50 p-4">
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
    <View className="my-2 flex w-fit flex-row gap-1 rounded-2xl rounded-bl-none border border-border/50 bg-white px-4 py-3 shadow-sm">
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-0"></View>
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-150"></View>
      <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-300"></View>
    </View>
  );
};

export default HistorySimulation;
