import "@/global.css";

import { ApiAuthProvider } from "@/components/providers/ApiAuthProvider";
import { NAV_THEME } from "@/lib/theme";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
            <ApiAuthProvider>
              {/* <StatusBar style={colorScheme === "dark" ? "light" : "dark"} /> */}
              <StatusBar style={"light"} />
              <SafeAreaView style={{ flex: 1 }}>
                <Routes />
                <PortalHost />
              </SafeAreaView>
            </ApiAuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}

SplashScreen.preventAutoHideAsync();

function Routes() {
  const { isSignedIn, isLoaded } = useAuth();

  // TODO: must make a check for when users don't have active internet connection
  React.useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  React.useEffect(() => {
    console.log("Auth state:", { isLoaded, isSignedIn });
  }, [isLoaded, isSignedIn]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerLeft: () => null,
      }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)/sign-in" options={SIGN_IN_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/sign-up" options={SIGN_UP_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/reset-password" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/forgot-password" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/verify-email" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(app)/index" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
        <Stack.Screen name="(app)/case/[id]" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
      </Stack.Protected>
    </Stack>
  );
}

const SIGN_IN_SCREEN_OPTIONS = {
  headerShown: false,
  title: "Sign in",
};

const SIGN_UP_SCREEN_OPTIONS = {
  presentation: "modal",
  headerShown: false,
  title: "",
  gestureEnabled: false,
} as const;

const DEFAULT_AUTH_SCREEN_OPTIONS = {
  title: "",
  headerShown: false,
};
