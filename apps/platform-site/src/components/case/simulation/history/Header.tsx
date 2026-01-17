import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import React from "react";
import PatientAvatar from "@/components/case/PatientAvatar";
import { X } from "lucide-react";

const HistoryHeader: React.FC<{
  patientName: string;
  onClose?: () => void;
}> = ({ patientName }) => {
  return (
    <DialogHeader className="z-10 border-b bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10">
          <PatientAvatar />
        </div>
        <div className="flex-1">
          <p className="font-display block text-lg">{patientName}</p>
          <p className="flex items-center gap-1 text-xs font-medium text-green-600">
            <p className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></p>
            Online
          </p>
        </div>
        <DialogClose>
          <X />
        </DialogClose>
      </div>
    </DialogHeader>
  );
};

export default HistoryHeader;
