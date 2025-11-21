export type Self = {
  id: string;
  type: AssetType;
  url: string;

  createdAt: string;
  updatedAt: string;
};

export type Row = {
  id: string;
  type: AssetType;
  url: string;

  created_at: Date;
  updated_at: Date;
};

export enum AssetType {
  Audio = 0,
  Image = 1,
  Video = 2,
}
