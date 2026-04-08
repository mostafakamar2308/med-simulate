// packages/api/src/hooks/media.ts
import { useApi } from "@/hooks/lib";
import { QueryKey } from "@/hooks/lib/keys";
import { IMedia } from "@med-simulate/types";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useListMedia = (filter: IMedia.IMediaListQuery) => {
  const api = useApi();

  return useQuery<IMedia.IMediaListResponse>({
    queryKey: [QueryKey.ListMedia, filter],
    queryFn: () => api.media.listMedia(filter),
  });
};

export const useGetMedia = (id: string) => {
  const api = useApi();

  return useQuery({
    queryKey: [QueryKey.GetMedia, id],
    queryFn: () => api.media.getMedia(id),
    enabled: !!id,
  });
};

export const useUploadMedia = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IMedia.IMediaUploadPayload) =>
      api.media.uploadMedia(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListMedia] });
    },
  });
};

export const useUpdateMedia = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IMedia.IMediaUpdatePayload;
    }) => api.media.updateMedia(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListMedia] });
    },
  });
};

export const useDeleteMedia = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.media.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ListMedia] });
    },
  });
};
