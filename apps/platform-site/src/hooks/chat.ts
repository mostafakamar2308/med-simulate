import { useState, useRef, useCallback } from "react";
import { IChat } from "@med-simulate/types";
import { useSendMessageStream } from "@med-simulate/api/hooks";

export const usePatientChat = (
  caseId: string,
  addMessage: (m: IChat.Message) => void,
) => {
  const [streamingText, setStreamingText] = useState("");
  const streamingTextRef = useRef("");
  const audioQueue = useRef<HTMLAudioElement[]>([]);
  const isAudioPlaying = useRef(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const playNext = useCallback(() => {
    if (isAudioPlaying.current || audioQueue.current.length === 0) {
      return;
    }

    const nextAudio = audioQueue.current.shift();
    if (!nextAudio) return;

    isAudioPlaying.current = true;
    currentAudioRef.current = nextAudio;

    nextAudio.onended = () => {
      isAudioPlaying.current = false;
      currentAudioRef.current = null;
      playNext();
    };

    nextAudio.onerror = (err) => {
      console.error("Audio playback error:", err);
      isAudioPlaying.current = false;
      playNext();
    };

    nextAudio.play().catch((err) => {
      console.error("Auto-play blocked or failed:", err);
      isAudioPlaying.current = false;
      playNext();
    });
  }, []);

  const stopAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    audioQueue.current = [];
    isAudioPlaying.current = false;
  }, []);

  const streamMutation = useSendMessageStream((chunk) => {
    switch (chunk.type) {
      case "text":
        streamingTextRef.current += chunk.content;
        setStreamingText((prev) => prev + chunk.content);
        break;

      case "audio":
        try {
          const audio = new Audio(`data:audio/wav;base64,${chunk.content}`);
          audioQueue.current.push(audio);

          playNext();
        } catch (err) {
          console.error("Failed to decode audio chunk:", err);
        }
        break;

      case "done":
        const finalText = streamingTextRef.current;

        addMessage({ text: finalText, sender: "patient" });
        streamingTextRef.current = "";
        setStreamingText("");
        break;

      case "error":
        console.error("Streaming error:", chunk.message);
        streamingTextRef.current = "";
        setStreamingText("");
        stopAudio();
        break;
    }
  });

  const sendMessage = useCallback(
    (text: string, currentHistory: IChat.Message[]) => {
      stopAudio();

      addMessage({ text, sender: "doctor" });
      streamingTextRef.current = "";
      setStreamingText("");

      streamMutation.mutate({
        caseId,
        chat: [...currentHistory, { text, sender: "doctor" }],
      });
    },
    [caseId, addMessage, streamMutation, stopAudio],
  );

  return {
    sendMessage,
    streamingText,
    isProcessing: streamMutation.isPending,
    isResponding: !!streamingText || isAudioPlaying.current,
    error: streamMutation.error,
  };
};
