import { DialogHeader } from "@/components/ui/dialog";
import React from "react";
import PatientAvatar from "@/components/case/PatientAvatar";
import { MessageCircle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const HistoryHeader: React.FC<{
  patientName: string;
  mode: "voice" | "chat";
  onModeChange: (id: "chat" | "voice") => void;
}> = ({ patientName, onModeChange, mode }) => {
  return (
    <DialogHeader className="z-10 border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10">
          <PatientAvatar />
        </div>
        <div className="flex-1">
          <p className="font-display block text-lg">{patientName}</p>
        </div>
        {mode === "chat" ? (
          <Button
            variant={"outline"}
            onClick={() => onModeChange("voice")}
            className="text-primary"
          >
            <Mic className="text-primary" />
            Voice Mode
          </Button>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => onModeChange("chat")}
            className="text-primary"
          >
            <MessageCircle className="text-primary" />
            Chat Mode
          </Button>
        )}
      </div>
    </DialogHeader>
  );
};

export default HistoryHeader;
