import React, { useCallback, useRef } from "react";
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
  const divRef = useRef<HTMLDivElement>(null);

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
    <Dialog open={isOpen}>
      <DialogContent>
        <HistoryHeader patientName={patientName} onClose={onClose} />
        <div ref={divRef} className="flex-1 bg-slate-50 px-4 pt-4">
          {messages.map((msg, idx) => (
            <ChatMessage message={msg} key={idx} />
          ))}

          {sendMessageMutation.isPending ? <TypingIndicator /> : null}
        </div>
        <SendMessage handleSend={sendMessage} />
      </DialogContent>
    </Dialog>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <div className="my-2 flex-row gap-1 self-start rounded-2xl rounded-bl-none border border-border/50 bg-white px-4 py-3 shadow-sm">
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-150" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-300" />
    </div>
  );
};

export default HistorySimulation;
