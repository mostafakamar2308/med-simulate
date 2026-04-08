export type Self = {
  id: string;
  diskName: string;
  displayName: string;
  mimeType: string;
  size: number;
  uploadedById: string;
  uploadedAt: string;
  url: string;
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
