import PatientAvatar from "../../PatientAvatar";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IChat } from "@med-simulate/types";
import { useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type ModeState =
  | "idle"
  | "listening"
  | "transcribing"
  | "processing"
  | "responding";

const VoiceMode: React.FC<{
  patientName: string;
  onModeChange: (id: "chat" | "voice") => void;
  messages: IChat.Message[];
  addMessage: (message: IChat.Message) => void;
}> = ({ messages, patientName, addMessage, onModeChange }) => {
  const [state, setState] = useState<ModeState>("responding");
  const [isMuted, setIsMuted] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    isSupported,
    start: startRecognition,
    stop: stopRecognition,
    reset: resetTranscript,
  } = useSpeechRecognition({
    lang: "ar-EG",
  });

  const startListening = () => {
    if (!isSupported) return;

    resetTranscript();
    setState("listening");
    startRecognition();
  };

  const stopListening = () => {
    if (!isSupported) return;

    stopRecognition();
    setState("transcribing");

    setTimeout(() => {
      const finalText = transcript.trim();

      if (finalText) {
        console.log("Final transcript:", finalText);
        addMessage({ sender: "doctor", text: finalText });
      }

      setState("listening");
    }, 300);
  };
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 w-full max-w-lg flex flex-col items-center justify-center py-2 gap-12">
      <div className="relative">
        <AnimatePresence>
          {state === "responding" && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/20 -z-10"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-primary/10 -z-20"
              />
            </>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "w-48 h-48 rounded-full border-4 transition-all duration-500 overflow-hidden bg-white shadow-2xl relative z-10",
            state === "responding"
              ? "border-primary ring-8 ring-primary/20 scale-105"
              : "border-border",
            state === "listening"
              ? "border-rose-500 ring-8 ring-rose-500/20"
              : "",
          )}
        >
          {/* Placeholder for actual patient image - in a real app we'd pass the same image as PatientAvatar */}
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-6xl">
            <PatientAvatar />
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <AnimatePresence mode="wait">
          {state === "listening" && (
            <motion.span
              key="listening"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LISTENING...
            </motion.span>
          )}
          {state === "transcribing" && (
            <motion.span
              key="transcribing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              TRANSCRIBING...
            </motion.span>
          )}
          {state === "processing" && (
            <motion.span
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              PATIENT THINKING...
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full bg-slate-50/50 rounded-3xl border border-slate-100 overflow-auto max-h-[140px] p-6 flex flex-col shadow-inner">
        <ScrollArea className="h-full flex-1" ref={divRef}>
          <div className="space-y-4">
            {messages.slice(-3).map((msg, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: msg.sender === "doctor" ? 20 : -20,
                }}
                animate={{
                  opacity: i === messages.slice(-3).length - 1 ? 1 : 0.5,
                  x: 0,
                }}
                className={cn(
                  "text-lg font-medium",
                  msg.sender === "doctor"
                    ? "text-primary text-right"
                    : "text-slate-700",
                )}
              >
                <span className="text-[10px] uppercase tracking-widest block opacity-50 mb-1">
                  {msg.sender === "doctor" ? "You" : patientName}
                </span>
                {msg.text}
              </motion.div>
            ))}
            {state === "listening" && (
              <div className="text-rose-500 italic animate-pulse text-lg">
                Capturing audio...
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="w-full max-w-lg flex flex-col items-center gap-8 pb-10">
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl z-20 relative",
                state === "listening"
                  ? "bg-rose-500 text-white scale-110 shadow-rose-500/40"
                  : "bg-primary text-white shadow-primary/40",
              )}
            >
              {state === "listening" ? (
                <Mic className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </motion.button>

            {state === "listening" && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-rose-500/30 -z-10"
              />
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={() => onModeChange("chat")}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {state === "listening" ? "Release to Send" : "Hold to Speak"}
        </p>
      </div>
    </div>
  );
};

export default VoiceMode;
