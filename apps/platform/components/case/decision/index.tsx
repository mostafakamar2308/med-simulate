import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { AlertCircle, Building2, Home } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { cn } from "@/lib/utils";

export type DecisionItem = "admit" | "discharge";

type DecisionProps = {
  isOpen: boolean;
  patientName: string;
  onDecision: (decision: DecisionItem) => void;
  onClose: () => void;
};

type Decision = {
  id: DecisionItem;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const decisions: Decision[] = [
  {
    id: "discharge",
    label: "Discharge",
    description: "Send Patient Home",
    icon: <Home width={24} height={24} color={"#16a34a"} />,
  },
  {
    id: "admit",
    label: "Admit",
    description: "Admit to Hospital",
    icon: <Building2 width={24} height={24} color={"#2563eb"} />,
  },
];

const Decision: React.FC<DecisionProps> = ({ isOpen, patientName, onDecision, onClose }) => {
  return (
    <Dialog className="!h-1/2" open={isOpen} onClose={onClose}>
      <DialogHeader className="gap-2 bg-slate-800 p-6">
        <View className="flex-row items-center gap-2">
          <AlertCircle color={"#fbbf24"} width={24} height={24} />
          <Text className="font-display text-xl font-bold text-white">Final Decision</Text>
        </View>
        <Text className="text-sm text-white/70">
          Based on your assessment, what is your disposition for{" "}
          <Text className="font-bold text-white">{patientName}</Text>?
        </Text>
      </DialogHeader>
      <DialogContent className="flex-1 p-6">
        <FlashList
          data={decisions}
          className="flex-1 gap-2"
          contentContainerClassName="flex-1 justify-center"
          renderItem={({ item }) => (
            <Button
              className="mb-2 h-full flex-1 items-center justify-center p-4"
              variant={"outline"}
              onPress={() => onDecision(item.id)}>
              <View className="flex-1 flex-row items-center justify-center gap-3">
                <View
                  className={cn(
                    "h-12 w-12 items-center justify-center rounded-3xl",
                    item.id === "admit" ? "bg-blue-100" : "bg-green-100"
                  )}>
                  {item.icon}
                </View>
                <View className="gap-1">
                  <Text className="text-lg font-bold text-foreground">{item.label}</Text>
                  <Text className="text-sm text-muted-foreground">{item.description}</Text>
                </View>
              </View>
            </Button>
          )}
        />
        <Text className="pt-2 text-center text-xs text-muted-foreground">
          This decision will affect your final score
        </Text>
      </DialogContent>
    </Dialog>
  );
};

export default Decision;
