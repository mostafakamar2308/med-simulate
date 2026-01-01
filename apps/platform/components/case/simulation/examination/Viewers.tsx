import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Finding } from "@med-simulate/types";
import AudioPlayer from "@/components/ui/audio";
import VideoPlayer from "@/components/ui/video";

export const ImageViewer: React.FC<{ finding: Exclude<Finding, { type: "img" }> }> = ({
  finding,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.url) return null;

  return (
    <View className="w-full flex-1 space-y-4">
      <Image source={{ uri: finding.url }} className="min-h-40 w-full rounded-lg object-contain" />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onPress={() => setShowDescription((prev) => !prev)}>
        <Text>{showDescription ? "Hide Report" : "Show Report"}</Text>
      </Button>

      {showDescription && (
        <Text className="text-center text-base font-medium text-primary">
          {finding.description}
        </Text>
      )}
    </View>
  );
};

export const AudioViewer: React.FC<{ finding: Exclude<Finding, { type: "audio" }> }> = ({
  finding,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.url) return null;

  return (
    <View className="w-full space-y-4 rounded-lg border border-primary px-4 py-2">
      <AudioPlayer source={finding.url} />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onPress={() => setShowDescription((prev) => !prev)}>
        <Text>{showDescription ? "Hide Explanation" : "Explain Audio"}</Text>
      </Button>

      {showDescription && (
        <Text className="text-center text-base font-medium text-primary">
          {finding.description}
        </Text>
      )}
    </View>
  );
};

export const VideoViewer: React.FC<{ finding: Exclude<Finding, { type: "video" }> }> = ({
  finding,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.url) return null;

  return (
    <View className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <VideoPlayer source={finding.url} />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onPress={() => setShowDescription((prev) => !prev)}>
        <Text>{showDescription ? "Hide Explanation" : "Explain Video"}</Text>
      </Button>

      {showDescription && (
        <Text className="text-center text-base font-medium text-primary">
          {finding.description}
        </Text>
      )}
    </View>
  );
};

export const TextViewer: React.FC<{ finding: Exclude<Finding, { type: "text" }> }> = ({
  finding,
}) => {
  return (
    <View className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <Text className="text-center text-xl font-bold text-primary">{finding.description}</Text>
    </View>
  );
};
