import React from "react";
import Animated from "react-native-reanimated";
import { Message } from "@/components/case/simulation/history/types";
import { Text } from "react-native";
import { cn } from "@/lib/utils";

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <Animated.View
      className={cn("flex w-full", message.sender === "doctor" ? "justify-end" : "justify-start")}>
      <Text
        className={cn(
          "max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
          message.sender === "doctor"
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none border border-border/50 bg-white text-foreground"
        )}>
        {message.text}
      </Text>
    </Animated.View>
  );
};

export default ChatMessage;
