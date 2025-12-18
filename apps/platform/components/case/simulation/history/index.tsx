import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Animated, ScrollView } from "react-native";
import HistoryHeader from "@/components/case/simulation/history/Header";
import ChatMessage from "@/components/case/simulation/history/Message";
import { View } from "react-native";
import SendMessage from "@/components/case/simulation/history/SendMessage";
import { IChat } from "@med-simulate/types";

const HistorySimulation: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  isTyping: boolean;
  patientName: string;
  messages: IChat.Message[];
}> = ({ isOpen, patientName, onClose, messages, isTyping }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] w-screen flex-col gap-0 overflow-hidden bg-background p-0">
        <HistoryHeader patientName={patientName} />

        <ScrollView className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-4">
          {messages.map((msg, idx) => (
            <ChatMessage message={msg} key={idx} />
          ))}

          {isTyping ? <TypingIndicator /> : null}
        </ScrollView>

        <SendMessage handleSend={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <Animated.View className="flex justify-start">
      <View className="flex flex-row gap-1 rounded-2xl rounded-bl-none border border-border/50 bg-white px-4 py-3 shadow-sm">
        <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-0"></View>
        <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-150"></View>
        <View className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-300"></View>
      </View>
    </Animated.View>
  );
};

export default HistorySimulation;
