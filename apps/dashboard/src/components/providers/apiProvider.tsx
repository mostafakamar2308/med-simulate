import { resolveBaseUrl } from "@/lib/api";
import { ApiProvider } from "@med-simulate/api/hooks";
import React from "react";

export function ApiAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider
      baseURL={resolveBaseUrl()}
      getToken={() => Promise.resolve("")}
    >
      {children}
    </ApiProvider>
  );
}
