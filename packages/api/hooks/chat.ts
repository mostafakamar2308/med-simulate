import { useApi } from "@/hooks/lib";
import { MutationKey } from "@/hooks/lib/keys";
import { IChat } from "@med-simulate/types";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useSendMessage = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: IChat.SendMessageResponse) => void;
  onError: () => void;
}) => {
  const api = useApi();

  const sendMessage = useCallback(
    async (payload: { chat: IChat.Message[]; caseId: string }) => {
      return api.chat.sendMessage(payload);
    },
    [api]
  );

  return useMutation({
    mutationKey: [MutationKey.SendMessage],
    mutationFn: sendMessage,
    onSuccess,
    onError,
  });
};
