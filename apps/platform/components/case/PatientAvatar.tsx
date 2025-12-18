import img from "@/assets/images/clerk-logo-light.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { View } from "react-native";

const PatientAvatar: React.FC<{ feelings?: string }> = ({ feelings }) => {
  return (
    <View className="relative">
      <Avatar
        alt="Patient Avatar"
        className="relative h-full w-full border-[6px] border-primary object-contain p-1">
        <AvatarImage resizeMode="contain" source={img} className="!h-full !w-full" />
      </Avatar>
      {feelings ? (
        <View className="absolute right-2 top-2 animate-bounce text-4xl drop-shadow-md">
          {feelings}
        </View>
      ) : null}
    </View>
  );
};

export default PatientAvatar;
