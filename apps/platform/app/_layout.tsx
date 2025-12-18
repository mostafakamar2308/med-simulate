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
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
          <ApiAuthProvider>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Routes />
            <PortalHost />
          </ApiAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

SplashScreen.preventAutoHideAsync();

function Routes() {
  const { isSignedIn, isLoaded } = useAuth();

  React.useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

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
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="index" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
        <Stack.Screen name="case/[id]" options={DEFAULT_AUTH_SCREEN_OPTIONS} />
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
  title: "",
  headerTransparent: true,
  gestureEnabled: false,
} as const;

const DEFAULT_AUTH_SCREEN_OPTIONS = {
  title: "",
  headerShadowVisible: false,
  headerTransparent: true,
  headerBackVisible: false,
};
