import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { Pause, Play } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Progress } from "@/components/ui/progress";
import { timeConverter } from "@/lib/time";

const AudioPlayer: React.FC<{ source: string }> = ({ source }) => {
  const player = useAudioPlayer(source, {
    downloadFirst: true,
    updateInterval: 100,
  });
  const [state, setState] = useState({
    isLoaded: false,
    playing: false,
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    if (!player) return;

    const sub = player.addListener("playbackStatusUpdate", (status) => {
      setState({
        isLoaded: status.isLoaded,
        playing: status.playing,
        currentTime: status.currentTime,
        duration: status.duration,
      });
    });

    return () => sub.remove();
  }, [player]);

  if (!state.isLoaded) {
    return <Text>Loading Audio...</Text>;
  }

  return (
    <View className="flex w-full flex-row items-center gap-4">
      <Pressable
        onPress={() => (state.playing ? player.pause() : player.play())}
        className="rounded-full bg-primary/50 p-3 text-foreground">
        {state.playing ? <Pause /> : <Play />}
      </Pressable>
      <View className="flex h-full flex-1 items-end justify-center gap-2">
        <Text>
          {timeConverter(state.currentTime)}/{timeConverter(state.duration)}
        </Text>
        <Progress value={(state.currentTime / (state.duration || state.currentTime)) * 100} />
      </View>
    </View>
  );
};

export default AudioPlayer;
