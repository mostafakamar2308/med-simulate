import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";

export function KeyboardScreen({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
