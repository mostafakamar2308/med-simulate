import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Text, View } from "react-native";
import img from "@/assets/images/react-native-reusables-light.png";

const PatientAvatar: React.FC<{ feelings?: string; uri?: string }> = ({
  feelings,
  uri = "https://avatars.githubusercontent.com/u/63797719",
}) => {
  return (
    <View className="relative h-full w-full">
      <Avatar
        alt="Patient Avatar"
        className="h-full w-full border-2 border-background web:border-0 web:ring-2 web:ring-background">
        <AvatarImage className="h-full w-full" source={img || { uri }} />
        <AvatarFallback>
          <Text>{feelings}</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
};

export default PatientAvatar;
