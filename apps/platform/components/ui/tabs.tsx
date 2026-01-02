import { cn } from "@/lib/utils";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type Tab = {
  id: string;
  label: string;
  component: React.ReactNode;
  active?: boolean;
};

const Tabs: React.FC<{ tabs: Tab[]; activeTab: string; changeTab: (id: string) => void }> = ({
  tabs,
  activeTab,
  changeTab,
}) => {
  return (
    <View className="flex-1 gap-2">
      <View className="flex flex-row gap-3 overflow-x-auto border-b-2 border-secondary px-4">
        {tabs.map((tab) => (
          <Pressable className="relative py-2" onPress={() => changeTab(tab.id)} key={tab.id}>
            <Text className={cn("text-lg", tab.id === activeTab && "font-bold text-primary")}>
              {tab.label}
            </Text>
            {tab.id === activeTab ? (
              <View className="absolute bottom-0 h-1 w-full bg-purple-500"></View>
            ) : null}
          </Pressable>
        ))}
      </View>
      <View className="flex-1 p-4">
        {tabs.filter((tab) => tab.id === activeTab)[0]?.component || null}
      </View>
    </View>
  );
};

export default Tabs;
