import { ApiContext } from "@/hooks/lib/context";
import { Api } from "@/requests";
import React, { useMemo } from "react";

export const ApiProvider: React.FC<{
  children: React.ReactNode;
  baseURL: string;
  getToken?: () => Promise<string | null>;
}> = ({ children, baseURL, getToken }) => {
  const api = useMemo(() => new Api({ baseURL, getToken }), [baseURL]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
