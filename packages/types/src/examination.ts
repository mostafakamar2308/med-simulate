export type ExaminationTemplate = {
  id: string;
  title: string;
  type: ExaminationTemplateType;
  description: string;

  createdAt: string;
  updatedAt: string;
};

export type ExaminationTemplateRow = {
  id: string;
  title: string;
  type: ExaminationTemplateType;
  description: string;

  created_at: Date;
  updated_at: Date;
};

export enum ExaminationTemplateType {
  Physical = 0,
  Investigation = 1,
  Imaging = 2,
  AudioBased = 3,
}

export type ExaminationField = {
  id: string;
  templateId: string;
  label: string;
  fieldType: ExaminationFieldType;
  createdAt: string;
  updatedAt: string;
};

export type ExaminationFieldRow = {
  id: string;
  template_id: string;
  label: string;
  field_type: ExaminationFieldType;
  created_at: Date;
  updated_at: Date;
};

export enum ExaminationFieldType {
  Enum = 0,
  Boolean = 1,
  Graded = 2,
  Text = 3,
  NumericRange = 4,
}

export type ExaminationFieldValue = {
  id: string;
  fieldId: string;
  label: string;
  isNormal: boolean;
  assetId?: string;
  metadata?: Record<string, string>; // generic JSON object
  createdAt: string;
  updatedAt: string;
};

export type ExaminationFieldValueRow = {
  id: string;
  field_id: string;
  label: string;
  is_normal: boolean;
  asset_id?: string;
  metadata?: Record<string, string>;
  created_at: Date;
  updated_at: Date;
};
