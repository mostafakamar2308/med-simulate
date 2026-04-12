import { useApi } from "@/hooks/lib";
import { QueryKey } from "@/hooks/lib/keys";
import { ICase } from "@med-simulate/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useFindCases = (filter: ICase.FindCasesApiQuery) => {
  const api = useApi();

  const findCases = useCallback(async () => {
    return api.case.findCases(filter);
  }, [api, filter]);

  return useQuery({
    queryKey: [QueryKey.FindCases, filter],
    queryFn: findCases,
  });
};

export const useFindCaseById = ({ id }: { id: string }) => {
  const api = useApi();

  const findCaseById = useCallback(async () => {
    return api.case.findCaseById({ id });
  }, [api, id]);

  return useQuery({
    queryKey: [QueryKey.FindCaseById, id],
    queryFn: findCaseById,
    enabled: !!id,
  });
};

export const useListCases = (params: { page?: number; limit?: number }) => {
  const api = useApi();

  return useQuery({
    queryKey: [QueryKey.ListCases, params],
    queryFn: () => api.case.listCases(params),
  });
};

export const useGetCase = (id: string) => {
  const api = useApi();

  return useQuery({
    queryKey: [QueryKey.GetCase, id],
    queryFn: () => api.case.getCase(id),
    enabled: !!id,
  });
};

export const useGetFindingForArea = (areaId: string) => {
  const api = useApi();

  return useQuery({
    queryKey: [QueryKey.GetFindingForArea, areaId],
    queryFn: () => api.case.getFindingForArea(areaId),
    enabled: !!areaId,
  });
};

export const useCreateCase = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICase.CreateCasePayload) =>
      api.case.createCase(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListCases] });
    },
  });
};

export const useUpdateCase = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ICase.UpdateCasePayload;
    }) => api.case.updateCase(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase, id] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListCases] });
    },
  });
};

export const useDeleteCase = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.case.deleteCase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListCases] });
    },
  });
};

export const useUpdateFinding = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      findingId,
      payload,
    }: {
      findingId: string;
      payload: ICase.UpdateFindingPayload;
    }) => api.case.updateFinding(findingId, payload),
    onSuccess: (_, { findingId }) => {
      // Invalidate any query that might include this finding (e.g., case details)
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetFindingForArea] });
    },
  });
};

export const useAddInvestigation = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      caseId,
      payload,
    }: {
      caseId: string;
      payload: ICase.AddInvestigationPayload;
    }) => api.case.addInvestigation(caseId, payload),
    onSuccess: (_, { caseId }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase, caseId] });
    },
  });
};

export const useUpdateInvestigationResult = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      resultId,
      payload,
    }: {
      resultId: string;
      payload: ICase.UpdateInvestigationResultPayload;
    }) => api.case.updateInvestigationResult(resultId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase] });
    },
  });
};

export const useAddTableData = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      resultId,
      payload,
    }: {
      resultId: string;
      payload: ICase.AddTableDataPayload;
    }) => api.case.addTableData(resultId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase] });
    },
  });
};

export const useLinkMediaToFinding = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      findingId,
      mediaId,
    }: {
      findingId: string;
      mediaId: string;
    }) => api.case.linkMediaToFinding(findingId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase] });
    },
  });
};

export const useLinkMediaToInvestigationResult = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      resultId,
      mediaId,
    }: {
      resultId: string;
      mediaId: string;
    }) => api.case.linkMediaToInvestigationResult(resultId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GetCase] });
    },
  });
};
