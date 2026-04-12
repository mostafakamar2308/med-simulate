export type Self = {
  id: string;
  createdAt: Date;
  size: number;
  diskName: string;
  displayName: string;
  mimeType: string;
  metadata?: any;
  uploadedById: string | null;
  uploadedAt: Date;
};

export type IMediaListQuery = {
  search?: string;
  type?: "image" | "video";
  page?: number;
  limit?: number;
};

export type IMediaListResponse = {
  success: boolean;
  files: Self[];
  total: number;
  page: number;
  limit: number;
};

export type IMediaUploadPayload = {
  media: File;
  displayName: string;
};

export type IMediaUploadResponse = {
  success: boolean;
  id: string;
  url: string;
  displayName: string;
  mediaType: string;
  size: number;
};
export type IMediaUpdatePayload = {
  displayName?: string;
};

export interface IMediaDeleteResponse {
  success: boolean;
  message: string;
}

export type IMediaApi = {
  list(params: IMediaListQuery): Promise<IMediaListResponse>;
  upload(payload: IMediaUploadPayload): Promise<{
    success: boolean;
    id: string;
    url: string;
    displayName: string;
  }>;
  getById(id: string): Promise<{ success: boolean; file: Self }>;
  update(
    id: string,
    data: IMediaUpdatePayload,
  ): Promise<{ success: boolean; file: Self }>;
  delete(id: string): Promise<{ success: boolean }>;
};
