import { useApi } from "@/hooks/lib";
import { QueryKey } from "@/hooks/lib/keys";
import { ICase } from "@med-simulate/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const useFindCases = (filter: ICase.FindCasesApiQuery) => {
  const api = useApi();

  const findCases = useCallback(async () => {
    return api.case.findCases(filter);
  }, [api]);

  return useQuery({
    queryKey: [QueryKey.FindCases],
    queryFn: findCases,
  });
};

export const useFindCaseById = ({ id }: { id: string }) => {
  const api = useApi();

  const findCaseById = useCallback(async () => {
    return api.case.findCaseById({ id });
  }, [api]);

  return useQuery({
    queryKey: [QueryKey.FindCaseById, id],
    queryFn: findCaseById,
  });
};
