export type Investigation = {
  id: string;
  name: string;
  result: InvestigationResult;
  guidance?: string;
};

export type InvestigationResult =
  | InvestigationBasicResult
  | InvestigationBinaryResult
  | InvestigationTableResult
  | InvestigationImageResult;

export type InvestigationBasicResultType = "number" | "text";

export type InvestigationBasicResult = {
  reference?: string;
  value: string | number;
  type: InvestigationBasicResultType;
  description: string;
};

export type InvestigationBinaryResultType = "binary";

export type InvestigationBinaryResult = {
  type: InvestigationBinaryResultType;
  value: "positive" | "negative";
  description: string;
};

export type InvestigationTableResultType = "table";
export type TableData = {
  name: string;
  value: number;
  unit: string;
  reference: string;
}[];

export type InvestigationTableResult = {
  type: InvestigationTableResultType;
  description: string;
  tableData: TableData;
};

export type InvestigationImageResultType = "image";

export type InvestigationImageResult = {
  type: InvestigationImageResultType;
  description: string;
  imageUrl: string;
};
