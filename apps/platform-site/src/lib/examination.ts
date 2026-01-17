import {
  type BodySystem,
  type ExaminationTechniqueType,
} from "@med-simulate/types";
import { Eye, Hand, Ear, Gem } from "lucide-react";

export type SystemDefinition = {
  id: BodySystem;
  label: string;
  icon: string;
  description: string;
};

export const BODY_SYSTEMS: SystemDefinition[] = [
  {
    id: "general",
    label: "General",
    icon: "👁️",
    description: "Overall appearance and vital signs",
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular",
    icon: "❤️",
    description: "Heart and circulation",
  },
  {
    id: "respiratory",
    label: "Respiratory",
    icon: "🫁",
    description: "Lungs and breathing",
  },
  {
    id: "abdomen",
    label: "Abdomen",
    icon: "🫘",
    description: "Belly and organs",
  },
  {
    id: "neurological",
    label: "Neurological",
    icon: "🧠",
    description: "Nerves and reflexes",
  },
  {
    id: "extremities",
    label: "Extremities",
    icon: "🦵",
    description: "Arms and legs",
  },
];

export const TECHNIQUES: {
  id: ExaminationTechniqueType;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
  { id: "inspect", icon: Eye, label: "Inspect", description: "Look & observe" },
  { id: "palpate", icon: Hand, label: "Palpate", description: "Feel & press" },
  { id: "auscultate", icon: Ear, label: "Auscultate", description: "Listen" },
  { id: "special", icon: Gem, label: "Special", description: "Focused Signs" },
];

export const getSystemLabel = (
  system: BodySystem
): { label: string; icon: string } => {
  const sys = BODY_SYSTEMS.find((s) => s.id === system);
  return { label: sys?.label || "", icon: sys?.icon || "" };
};
