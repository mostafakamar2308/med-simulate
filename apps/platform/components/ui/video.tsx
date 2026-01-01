import React from "react";
import { View, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";

interface ExpoVideoPlayerProps {
  source: VideoSource;
}

const VideoPlayer: React.FC<ExpoVideoPlayerProps> = ({ source }) => {
  const player = useVideoPlayer(source, (p) => {
    p.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} fullscreenOptions={{ enable: true }} style={styles.video} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoPlayer;
