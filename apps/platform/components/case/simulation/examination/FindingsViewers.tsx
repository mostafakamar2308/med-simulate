import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import AudioPlayer from "@/components/ui/audio";
import { Finding } from "@med-simulate/types";
import { Image, Text, View } from "react-native";
import { Button } from "@/components/ui/button";

export const ImageViewer: React.FC<{ finding: Exclude<Finding, { type: "img" }> }> = ({
  finding,
}) => {
  if (!finding.url) return null;

  return (
    <View className="w-full flex-1 space-y-4">
      <Image
        source={{ uri: finding.url }}
        className="h-full min-h-40 w-full flex-1 rounded-lg object-contain"
      />
      <Dialog className="">
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="rounded-sm">
            <Text>Show Report</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[80vh] w-screen">
          <DialogHeader className="flex flex-row">
            <DialogTitle>Image Description</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex h-full flex-col items-center justify-center space-y-4">
            <Image
              source={{ uri: finding.url }}
              className="min-h-80 w-full rounded-lg object-contain"
            />
            <Text className="block w-full text-center text-xl font-bold text-primary">
              {finding.description}
            </Text>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export const AudioViewer: React.FC<{ finding: Exclude<Finding, { type: "audio" }> }> = ({
  finding,
}) => {
  if (!finding.url) return null;

  return (
    <View className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <AudioPlayer source={finding.url} />
      <Dialog className="">
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="rounded-sm">
            <Text>Explain Audio</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[80vh] w-screen">
          <DialogHeader className="flex flex-row">
            <DialogTitle>Audio Description</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex h-full flex-col items-center justify-center space-y-4">
            <View className="w-full">
              <AudioPlayer source={finding.url} />
            </View>
            <Text className="block w-full text-center text-xl font-bold text-primary">
              {finding.description}
            </Text>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </View>
  );
};
