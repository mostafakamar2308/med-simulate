import { Activity, ClipboardList, DoorOpen, Pill, Stethoscope, User } from "lucide-react-native";
import { Text, View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

type Element<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const ACTION_CATEGORIES: ActionCategory[] = [
  { id: "history", label: "History", icon: ClipboardList, color: "bg-blue-100  text-blue-600" },
  { id: "exam", label: "Exam", icon: Stethoscope, color: "bg-teal-100 text-teal-600" },
  { id: "investigations", label: "Tests", icon: Activity, color: "bg-purple-100 text-purple-600" },
  { id: "consult", label: "Consult", icon: User, color: "bg-orange-100 text-orange-600" },
  { id: "treatment", label: "Treat", icon: Pill, color: "bg-green-100 text-green-600" },
  { id: "disposition", label: "Decide", icon: DoorOpen, color: "bg-rose-100  text-rose-600" },
];

const SimulationActions: React.FC<{
  onActionPress: (id: Element<typeof ACTION_CATEGORIES>["id"]) => void;
}> = ({ onActionPress }) => {
  return (
    <View className="!grid w-full !grid-cols-2 justify-between gap-8">
      {ACTION_CATEGORIES.map((action) => (
        <Button
          className={cn("border", action.color)}
          onPress={() => onActionPress(action.id)}
          key={action.id}>
          <action.icon className="mb-1 h-8 w-8 opacity-80 transition-opacity group-hover:opacity-100" />
          <Text className="text-base font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
            {action.label}
          </Text>
        </Button>
      ))}
    </View>
  );
};

export default SimulationActions;
