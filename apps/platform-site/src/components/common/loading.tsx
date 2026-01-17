import { Stethoscope } from "lucide-react";
import React from "react";

const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-1 items-center justify-center gap-4 text-primary">
      <Stethoscope className="h-10 w-10 animate-pulse" />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
