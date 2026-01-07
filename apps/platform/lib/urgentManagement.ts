import { IConsultation, IInvestigation, ITreatment } from "@med-simulate/types";

export function isInvestigation(item: unknown): item is IInvestigation.Investigation {
  return !!item && typeof item === "object" && "role" in item && item.role === "investigation";
}

export function isConsultation(item: unknown): item is IConsultation.Consultation {
  return !!item && typeof item === "object" && "role" in item && item.role === "consultation";
}

export function isTreatment(item: unknown): item is ITreatment.Treatment {
  return !!item && typeof item === "object" && "role" in item && item.role === "treatment";
}
