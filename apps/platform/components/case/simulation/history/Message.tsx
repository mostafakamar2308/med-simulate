import React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";
import { IChat } from "@med-simulate/types";

const ChatMessage: React.FC<{ message: IChat.Message }> = ({ message }) => {
  return (
    <View
      className={cn(
        "flex w-full flex-row",
        message.sender === "doctor" ? "justify-end" : "justify-start"
      )}>
      <Text
        className={cn(
          "my-1 max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
          message.sender === "doctor"
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none border border-border/50 bg-white text-foreground"
        )}>
        {message.text}
      </Text>
    </View>
  );
};

export default ChatMessage;
