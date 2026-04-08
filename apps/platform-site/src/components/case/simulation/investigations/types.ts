import { ICase } from "@med-simulate/types";

export type TakenInvestigation = ICase.Investigation & { timeStamp: string };

export type InvestigationListProps = {
  onTakeInvestigation?: (action: TakenInvestigation) => void;
  investigations: ICase.Investigation[];
};

export type InvestigationTakenProps = {
  takenInvestigations: (ICase.Investigation & {
    timeStamp: string;
  })[];
};
