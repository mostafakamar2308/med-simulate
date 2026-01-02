import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Clock } from "lucide-react-native";
import {
  ActionsTakenProps,
  ActionTaken,
} from "@/components/case/simulation/urgentManangement/types";

const ActionsTaken: React.FC<ActionsTakenProps> = ({ takenActions }) => {
  const getResultDisplay = (result: ActionTaken["result"]) => {
    if (!result) return null;

    switch (result.type) {
      case "number":
        return (
          <Text className="font-mono">
            <Text className="font-bold text-blue-600">{result.value}</Text>
            {result.reference && ` ${result.reference}`}
          </Text>
        );
      case "text":
        return <Text className="font-medium text-gray-900">{result.value}</Text>;
      case "binary":
        return <Text className="font-bold text-blue-600">{result.value}</Text>;
      default:
        return null;
    }
  };

  if (takenActions.length === 0) {
    return (
      <View className="flex-col items-center justify-center py-20">
        <Clock size={48} color="#374151" />
        <Text className="mt-4 items-center justify-center text-2xl text-gray-700">
          Take an action...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="relative">
        <View className="absolute bottom-2 left-4 top-2 w-0.5 bg-gray-300" />
        {takenActions.reverse().map((action, idx) => (
          <View key={action.timeStamp.toString()} className="relative mb-8 pl-10">
            <View className="absolute left-0 top-1 z-10 h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
              <Text className="text-base text-[#3b82f6]">{takenActions.length - idx}</Text>
            </View>
            <View className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <View className="mb-2 flex-row items-start justify-between">
                <Text className="text-xs text-gray-500">
                  {new Date(action.timeStamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <Text className="mb-2 font-bold text-gray-900">{action.name}</Text>
              {action.result && (
                <View className="mt-2 rounded-lg border border-gray-200 bg-white/80 p-2">
                  {getResultDisplay(action.result)}
                  {action.result.description && (
                    <Text className="mt-1 italic text-gray-600">{action.result.description}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ActionsTaken;
