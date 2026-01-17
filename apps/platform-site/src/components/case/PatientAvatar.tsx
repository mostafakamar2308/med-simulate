import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const PatientAvatar: React.FC<{ feelings?: string; uri?: string }> = ({
  feelings,
  uri = "https://avatars.githubusercontent.com/u/63797719",
}) => {
  return (
    <div className="relative h-full w-full">
      <Avatar className="h-full w-full border-2 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage alt="Patient Avatar" className="h-full w-full" src={uri} />
        <AvatarFallback>
          <p>{feelings}</p>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default PatientAvatar;
