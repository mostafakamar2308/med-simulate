import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface ActionCategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "purple" | "green" | "orange";
  onPress: () => void;
}

const ActionCategoryCard: React.FC<ActionCategoryCardProps> = ({
  title,
  description,
  icon,
  color,
  onPress,
}) => {
  const colorConfig = {
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-900",
      textLight: "text-purple-700",
      iconBg: "bg-purple-500",
      chevron: "text-purple-400",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-900",
      textLight: "text-green-700",
      iconBg: "bg-green-500",
      chevron: "text-green-400",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-900",
      textLight: "text-orange-700",
      iconBg: "bg-orange-500",
      chevron: "text-orange-400",
    },
  };

  const config = colorConfig[color];

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "w-full flex-row items-center gap-4 rounded-2xl border p-5",
        config.bg,
        config.border
      )}>
      <View className={cn("flex h-12 w-12 items-center justify-center rounded-xl", config.iconBg)}>
        {icon}
      </View>

      <View className="flex-1">
        <Text className={cn("font-bold", config.text)}>{title}</Text>
        <Text className={cn("text-xs", config.textLight)}>{description}</Text>
      </View>

      <ChevronRight size={20} className={config.chevron} />
    </TouchableOpacity>
  );
};

export default ActionCategoryCard;
