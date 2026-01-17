import React from "react";
import { cn } from "@/lib/utils";
import { IChat } from "@med-simulate/types";

const ChatMessage: React.FC<{ message: IChat.Message }> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row",
        message.sender === "doctor" ? "justify-end" : "justify-start"
      )}
    >
      <p
        className={cn(
          "my-1 max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
          message.sender === "doctor"
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none border border-border/50 bg-white text-foreground"
        )}
      >
        {message.text}
      </p>
    </div>
  );
};

export default ChatMessage;
