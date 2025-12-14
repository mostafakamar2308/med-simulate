import { useApi } from "@/hooks/lib";
import { QueryKey } from "@/hooks/lib/keys";
import { ICase } from "@med-simulate/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const useFindCases = (filter: ICase.FindCasesApiQuery) => {
  const api = useApi();

  const findCases = useCallback(async () => {
    return api.case.findLessons(filter);
  }, [api]);

  return useQuery({
    queryKey: [QueryKey.FindCases],
    queryFn: findCases,
  });
};
