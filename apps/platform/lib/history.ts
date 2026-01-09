import { Activity, ClipboardList, DoorOpen, Pill, Stethoscope, User } from "lucide-react-native";

export type ActionCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
};

export const OUT_PATIENT_ACTION_CATEGORIES: ActionCategory[] = [
  {
    id: "history",
    label: "History",
    icon: ClipboardList,
    color: "bg-blue-100  text-blue-600",
  },
  {
    id: "exam",
    label: "Exam",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "investigations",
    label: "Tests",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "consult",
    label: "Consult",
    icon: User,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "treatment",
    label: "Treat",
    icon: Pill,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "disposition",
    label: "Decide",
    icon: DoorOpen,
    color: "bg-rose-100  text-rose-600",
  },
];

export const ER_ACTION_CATEGORIES: ActionCategory[] = [
  {
    id: "history",
    label: "History",
    icon: ClipboardList,
    color: "bg-blue-100  text-blue-600",
  },
  {
    id: "exam",
    label: "Exam",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "management",
    label: "Manage Patient",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "decision",
    label: "Decide",
    icon: DoorOpen,
    color: "bg-rose-100  text-rose-600",
  },
];
