import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable } from "react-native";

type Props = BottomTabBarButtonProps;

function TabButton({ children, onPress }: Props) {
  return (
    <Pressable className={`flex-1 items-center justify-center gap-2`} onPress={onPress}>
      {children}
    </Pressable>
  );
}

export default TabButton;
