import { Stack } from "expo-router";
import * as React from "react";

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function SignUpLayout() {
  return <Stack screenOptions={SCREEN_OPTIONS} />;
}
