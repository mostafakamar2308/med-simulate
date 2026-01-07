import { Button } from "@/components/ui/button";

import { Finding } from "@med-simulate/types";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  AudioViewer,
  ImageViewer,
  TextViewer,
  VideoViewer,
} from "@/components/case/simulation/examination/Viewers";

const FindingViewer: React.FC<{
  findings: Finding[];
}> = ({ findings }) => {
  const [finding, setFinding] = useState<number>(0);

  useEffect(() => {
    setFinding(0);
  }, [findings]);

  const goNext = () => {
    if (finding === findings.length - 1) {
      setFinding(0);
      return;
    }
    setFinding((prev) => prev + 1);
  };

  const goPrevious = () => {
    if (finding <= 0) {
      setFinding(findings.length - 1);
      return;
    }
    setFinding((prev) => prev - 1);
  };

  if (findings.length === 0) return <Text>No Findings Here</Text>;

  return (
    <View className="mb-4 flex w-5/6 translate-x-3 flex-row flex-nowrap items-center gap-2">
      {findings.length > 1 ? (
        <Button onPress={goPrevious} variant={"outline"}>
          <ArrowLeft />
        </Button>
      ) : null}
      {findings[finding]?.type === "img" ? <ImageViewer finding={findings[finding]} /> : null}
      {findings[finding]?.type === "audio" ? <AudioViewer finding={findings[finding]} /> : null}
      {findings[finding]?.type === "video" ? <VideoViewer finding={findings[finding]} /> : null}
      {findings[finding]?.type === "text" ? <TextViewer finding={findings[finding]} /> : null}
      {findings.length > 1 ? (
        <Button onPress={goNext} variant={"outline"}>
          <ArrowRight />
        </Button>
      ) : null}
    </View>
  );
};

export default FindingViewer;
