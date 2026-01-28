import { useApi } from "@/hooks/lib";
import { MutationKey } from "@/hooks/lib/keys";
import { IChat } from "@med-simulate/types";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useSendMessageStream = (
  onUpdate: (data: IChat.StreamChunk) => void,
) => {
  const api = useApi();

  const sendMessage = useCallback(
    async (payload: { chat: IChat.Message[]; caseId: string }) => {
      const stream = await api.chatV2.sendMessageStream(payload);
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");

        buffer = parts.pop() || "";

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;

          const json = line.replace(/^data:\s*/, "");

          try {
            const parsed = JSON.parse(json);
            onUpdate(parsed);
          } catch (err) {
            console.warn("Failed to parse SSE JSON", json);
          }
        }
      }
    },
    [api],
  );

  return useMutation({
    mutationKey: [MutationKey.SendMessage],
    mutationFn: sendMessage,
  });
};
