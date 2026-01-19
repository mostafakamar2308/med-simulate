import { useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {},
): UseSpeechRecognitionReturn {
  const { lang = "ar-EG", continuous = true, interimResults = true } = options;

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef("");

  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionConstructor();

    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onresult = (event) => {
      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          finalChunk += text;
        } else {
          interim += text;
        }
      }

      if (finalChunk) {
        transcriptRef.current += finalChunk + " ";
        setTranscript(transcriptRef.current);
      } else {
        setTranscript(transcriptRef.current + interim);
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [lang, continuous, interimResults]);

  const start = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
    } catch {
      // TODO: throw errors
    }
  };

  const stop = () => {
    recognitionRef.current?.stop();
  };

  const reset = () => {
    transcriptRef.current = "";
    setTranscript("");
  };

  return {
    transcript,
    isSupported,
    start,
    stop,
    reset,
  };
}
