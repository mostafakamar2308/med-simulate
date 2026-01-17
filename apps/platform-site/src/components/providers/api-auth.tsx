import { resolveBaseUrl } from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";
import { ApiProvider } from "@med-simulate/api/hooks";
import React from "react";

export function ApiAuthProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <ApiProvider baseURL={resolveBaseUrl()} getToken={getToken}>
      {children}
    </ApiProvider>
  );
}
