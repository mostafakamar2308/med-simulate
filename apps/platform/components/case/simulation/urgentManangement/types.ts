import { IInvestigation } from "@med-simulate/types";

export type ActionCategory = "investigations" | "treatment" | "consultation";

export type ActionTaken = IInvestigation.Investigation & {
  timeStamp: string;
};

export type ActionsToTakeProps = {
  onActionTaken?: (action: ActionTaken) => void;
};

export type ActionListProps = {
  category: ActionCategory;
  onBack: () => void;
  onActionTaken?: (action: ActionTaken) => void;
};

export type ActionsTakenProps = {
  takenActions: ActionTaken[];
};
