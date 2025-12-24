import React from "react";
import { View } from "react-native";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";

interface ExpoVideoPlayerProps {
  source: VideoSource;
}

const VideoPlayer: React.FC<ExpoVideoPlayerProps> = ({ source }) => {
  const player = useVideoPlayer(source, (p) => {
    p.play();
  });

  return (
    <View className="w-full gap-3">
      <VideoView
        player={player}
        allowsFullscreen
        className="h-[220px] w-full overflow-hidden rounded-xl"
      />
    </View>
  );
};

export default VideoPlayer;
