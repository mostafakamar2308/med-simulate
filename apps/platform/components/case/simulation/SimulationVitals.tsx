import { Text, View } from "react-native";
import React from "react";
import { Activity, Droplets, HeartPulse, Wind } from "lucide-react-native";

const SimulationVitals = () => {
  return (
    <View className="w-screen -translate-x-4 border-t border-border bg-white/90 p-4 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <View className="flex flex-row items-center justify-between">
        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2 text-blue-500">
            <Activity className="h-4 w-4" />
            <Text className="text-base font-bold uppercase">BP</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none">120/80</Text>
        </View>

        <View className="h-8 w-px bg-border" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2 text-rose-500">
            <HeartPulse className="h-4 w-4 animate-pulse" />
            <Text className="text-base font-bold uppercase">HR</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none">88</Text>
        </View>

        <View className="h-8 w-px bg-border" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2 text-sky-500">
            <Wind className="h-4 w-4" />
            <Text className="text-base font-bold uppercase">RR</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none">16</Text>
        </View>

        <View className="h-8 w-px bg-border" />

        <View className="flex w-1/4 flex-col items-center gap-3">
          <View className="flex flex-row items-center gap-2 text-indigo-500">
            <Droplets className="h-4 w-4" />
            <Text className="text-base font-bold uppercase">Sat</Text>
          </View>
          <Text className="font-mono text-lg font-bold leading-none">98%</Text>
        </View>
      </View>
    </View>
  );
};

export default SimulationVitals;
