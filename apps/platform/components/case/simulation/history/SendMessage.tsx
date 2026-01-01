import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

const SendMessage: React.FC<{ handleSend: (message: string) => void }> = ({ handleSend }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <View className="flex flex-row items-center gap-2 p-2">
      <Input
        value={inputValue}
        onChangeText={(val) => setInputValue(val)}
        placeholder="Ask patient a question..."
        className="h-12 flex-1 rounded-xl border-none bg-secondary/30 focus-visible:ring-primary/20"
        autoFocus
      />
      <Button
        size="icon"
        className="h-12 w-12 rounded-xl shadow-md shadow-primary/20 transition-transform active:scale-95"
        disabled={!inputValue.trim()}
        onPress={() => {
          handleSend(inputValue);
          setInputValue("");
        }}>
        <Send className="h-5 w-5" />
      </Button>
    </View>
  );
};

export default SendMessage;
