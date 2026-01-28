import PatientAvatar from "../../PatientAvatar";
import { motion, AnimatePresence } from "motion/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IChat } from "@med-simulate/types";
import { useCallback, useEffect, useRef } from "react";
import SpeachRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { delay } from "@/lib/time";

const VoiceMode: React.FC<{
  patientName: string;
  streamingText: string;
  messages: IChat.Message[];
  isResponding?: boolean;
  onModeChange: (id: "chat" | "voice") => void;
  addMessage: (message: IChat.Message) => void;
}> = ({
  messages,
  patientName,
  isResponding,
  streamingText,
  addMessage,
  onModeChange,
}) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    browserSupportsContinuousListening,
    resetTranscript,
  } = useSpeechRecognition();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  const startListening = useCallback(async () => {
    if (browserSupportsContinuousListening) {
      await SpeachRecognition.startListening({
        continuous: true,
        language: "ar-EG",
      });
    } else {
      await SpeachRecognition.startListening({
        language: "ar-EG",
      });
    }
  }, []);

  const stopListening = useCallback(async () => {
    await SpeachRecognition.stopListening();
    // Delaying for completion of transcript
    await delay();
    addMessage({ sender: "doctor", text: transcript });
    resetTranscript();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) return <NoVoiceModeSupport />;

  if (!isMicrophoneAvailable) return <NoEnabledMic />;

  return (
    <div className="flex-1 w-full max-w-lg flex flex-col items-center justify-center py-2 gap-12">
      <div className="relative">
        <div
          className={cn(
            "w-48 h-48 rounded-full border-4 transition-all duration-500 overflow-hidden bg-white shadow-2xl relative z-10",
            isResponding
              ? "border-primary ring-8 ring-primary/20 scale-105"
              : "border-border",
            listening ? "border-rose-500 ring-8 ring-rose-500/20" : "",
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
          {listening && (
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

          {isResponding && (
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
            {streamingText ? (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className={cn("text-lg font-medium text-slate-700")}
              >
                <span className="text-[10px] uppercase tracking-widest block opacity-50 mb-1">
                  {patientName}
                </span>
                {streamingText}
              </motion.div>
            ) : null}
            {listening && (
              <div className="text-rose-500 italic animate-pulse text-lg">
                Capturing audio...
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="w-full max-w-lg flex flex-col items-center gap-8 pb-10">
        <div className="flex items-center gap-8">
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
                listening
                  ? "bg-rose-500 text-white scale-110 shadow-rose-500/40"
                  : "bg-primary text-white shadow-primary/40",
              )}
            >
              {listening ? (
                <Mic className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </motion.button>

            {listening && (
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
          {listening ? "Release to Send" : "Hold to Speak"}
        </p>
      </div>
    </div>
  );
};

export default VoiceMode;

const NoVoiceModeSupport: React.FC = () => (
  <div>
    This browser doesn't support Speech Api, Please use the latest version of
    chrome
  </div>
);

const NoEnabledMic: React.FC = () => {
  const getPerm = useCallback(async () => {
    await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
  }, []);

  return (
    <div className="text-2xl px-2 text-center mt-4">
      <p>Please Enable The Microphone to access voice mode</p>
      <Button onClick={getPerm}>Give Permission</Button>
    </div>
  );
};
