import { IConsultation, IInvestigation, ITreatment } from "@med-simulate/types";

export type ActionCategory = "investigations" | "treatment" | "consultation";

export type ActionListItem =
  | IInvestigation.Investigation
  | IConsultation.Consultation
  | ITreatment.Treatment;

export type ActionTaken = ActionListItem & {
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
