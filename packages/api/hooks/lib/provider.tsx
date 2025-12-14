import { ApiContext } from "@/hooks/lib/context";
import { Api } from "@/requests";
import React, { useMemo } from "react";

export const ApiProvider: React.FC<{
  children: React.ReactNode;
  baseURL: string;
}> = ({ children, baseURL }) => {
  const api = useMemo(() => new Api(baseURL), [baseURL]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
