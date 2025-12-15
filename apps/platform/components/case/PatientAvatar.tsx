import img from "@/assets/images/clerk-logo-light.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const PatientAvatar: React.FC = () => {
  return (
    <Avatar
      alt="Patient Avatar"
      className="h-full w-full border-[6px] border-primary object-contain p-1">
      <AvatarImage resizeMode="contain" source={img} className="!h-full !w-full" />
    </Avatar>
  );
};

export default PatientAvatar;
