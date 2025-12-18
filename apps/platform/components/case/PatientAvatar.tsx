import img from "@/assets/images/clerk-logo-light.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Text, View } from "react-native";

const PatientAvatar: React.FC<{ feelings?: string }> = ({ feelings }) => {
  return (
    <View className="relative">
      <Avatar
        alt="Patient Avatar"
        className="relative h-full w-full border-[6px] border-primary object-contain p-1">
        <AvatarImage resizeMode="contain" source={img} className="!h-full !w-full" />
      </Avatar>
      {feelings ? (
        <View className="absolute right-2 top-2 animate-bounce drop-shadow-md">
          <Text className="text-4xl">{feelings}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default PatientAvatar;
