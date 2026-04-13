import { useApi } from "@/hooks/lib";
import { IGrading } from "@med-simulate/types";
import { useMutation } from "@tanstack/react-query";

export const useGradeHistory = () => {
  const api = useApi();
  return useMutation<
    IGrading.HistoryGradingResponse,
    Error,
    IGrading.HistoryGradingInput
  >({
    mutationFn: (payload) => api.grading.gradeHistory(payload),
  });
};

export const useGradeExam = () => {
  const api = useApi();
  return useMutation<
    IGrading.ExamGradingResponse,
    Error,
    IGrading.ExamGradingInput
  >({
    mutationFn: (payload) => api.grading.gradeExam(payload),
  });
};

export const useGradeInvestigations = () => {
  const api = useApi();
  return useMutation<
    IGrading.InvestigationsGradingResponse,
    Error,
    IGrading.InvestigationsGradingInput
  >({
    mutationFn: (payload) => api.grading.gradeInvestigations(payload),
  });
};

export const useGradeDiagnosis = () => {
  const api = useApi();
  return useMutation<
    IGrading.DiagnosisGradingResponse,
    Error,
    IGrading.DiagnosisGradingInput
  >({
    mutationFn: (payload) => api.grading.gradeDiagnosis(payload),
  });
};
