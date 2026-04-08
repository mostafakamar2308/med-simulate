// packages/api/src/requests/media.ts
import { Base } from "@/requests/lib/base";
import { IMedia } from "@med-simulate/types";

export class Media extends Base {
  async listMedia(
    params: IMedia.IMediaListQuery,
  ): Promise<IMedia.IMediaListResponse> {
    return this.get({ route: "/api/v1/media/files", params });
  }

  async getMedia(id: string): Promise<{ success: boolean; file: IMedia.Self }> {
    return this.get({ route: `/api/v1/media/files/${id}` });
  }

  async uploadMedia(
    payload: IMedia.IMediaUploadPayload,
  ): Promise<IMedia.IMediaUploadResponse> {
    const formData = new FormData();
    formData.append("media", payload.media);
    formData.append("displayName", payload.displayName);

    // Override content-type for FormData
    return this.client
      .post("/api/v1/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  }

  async updateMedia(
    id: string,
    payload: IMedia.IMediaUpdatePayload,
  ): Promise<{ success: boolean; file: IMedia.Self }> {
    return this.put({ route: `/api/v1/media/files/${id}`, payload });
  }

  async deleteMedia(id: string): Promise<IMedia.IMediaDeleteResponse> {
    return this.delete({ route: `/api/v1/media/files/${id}` });
  }
}
