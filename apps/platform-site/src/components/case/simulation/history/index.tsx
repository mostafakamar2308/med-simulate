import React, { useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import HistoryHeader from "@/components/case/simulation/history/Header";
import ChatMessage from "@/components/case/simulation/history/Message";
import SendMessage from "@/components/case/simulation/history/SendMessage";
import { IChat } from "@med-simulate/types";
import { useSendMessage } from "@med-simulate/api/hooks";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const HistorySimulation: React.FC<{
  isTyping: boolean;
  patientName: string;
  messages: IChat.Message[];
  caseId: string;
  addMessage: (message: IChat.Message) => void;
}> = ({ caseId, patientName, messages, addMessage }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const onSendMessageSuccess = useCallback(
    (data: IChat.SendMessageResponse) => {
      addMessage({ text: data.text, sender: "patient" });
    },
    [addMessage],
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
    [messages, caseId, addMessage, sendMessageMutation],
  );

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "items-center flex flex-col justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
          "border-white/50 p-8 bg-white/90",
        )}
      >
        <ClipboardList className="h-6 w-6 opacity-80" />
        <p className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
          History
        </p>
      </DialogTrigger>
      <DialogContent
        className="min-h-3/4 max-h-3/4 flex flex-col"
        showCloseButton={false}
      >
        <HistoryHeader patientName={patientName} />
        <div ref={divRef} className="flex-1 overflow-auto bg-slate-50 px-4">
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
    <div className="my-2 w-fit flex flex-row gap-1 self-start rounded-2xl rounded-bl-none border border-border/50 bg-white px-4 py-3 shadow-sm">
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-150" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 delay-300" />
    </div>
  );
};

export default HistorySimulation;
