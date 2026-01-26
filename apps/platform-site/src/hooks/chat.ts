import { useState, useRef, useCallback } from "react";
import { IChat } from "@med-simulate/types";
import { useSendMessageStream } from "@med-simulate/api/hooks";

export const usePatientChat = (
  caseId: string,
  addMessage: (m: IChat.Message) => void,
) => {
  const [streamingText, setStreamingText] = useState("");
  const isPlaying = useRef(false);
  const audioQueue = useRef<HTMLAudioElement[] | null>(null);

  const streamMutation = useSendMessageStream((chunk) => {
    switch (chunk.type) {
      case "text":
        setStreamingText((prev) => prev + chunk.content);
        break;

      case "audio":
        try {
          console.log("audiotype: ", chunk.type);
          console.log("audiocontent: ", chunk.content);
          const audio = new Audio(`data:audio/wav;base64,${chunk.content}`);
          audio.play();

          // const arrayBuffer = base64ToArrayBuffer(chunk.content);
          // audioQueue.current.push(arrayBuffer);
          // playNext();
        } catch (err) {
          console.error("Failed to decode audio chunk:", err);
        }
        break;

      case "done":
        setStreamingText((final) => {
          if (final) addMessage({ text: final, sender: "patient" });
          return "";
        });
        break;

      case "error":
        console.error("Streaming error:", chunk.message);
        setStreamingText("");
        break;
    }
  });

  const sendMessage = useCallback(
    (text: string, currentHistory: IChat.Message[]) => {
      addMessage({ text, sender: "doctor" });
      setStreamingText("");
      audioQueue.current = []; // clear previous audio
      isPlaying.current = false;

      streamMutation.mutate({
        caseId,
        chat: [...currentHistory, { text, sender: "doctor" }],
      });
    },
    [caseId, addMessage, streamMutation],
  );

  return {
    sendMessage,
    streamingText,
    isProcessing: streamMutation.isPending,
    isResponding: !!streamingText || isPlaying.current,
    error: streamMutation.error,
  };
};
