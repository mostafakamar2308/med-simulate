import { Icon } from "@/components/ui/icon";
import TabButton from "@/components/ui/TabButton";
import { Tabs } from "expo-router";
import { ClipboardList, House, Settings } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarButton: (props) => <TabButton {...props} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon size={28} as={House} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="index3"
        options={{
          title: "Cases",
          tabBarIcon: ({ color, focused }) => (
            <Icon size={28} as={ClipboardList} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="index2"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Icon size={28} as={Settings} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
