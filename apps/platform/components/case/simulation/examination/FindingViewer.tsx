import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Finding } from "@med-simulate/types";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";

const FindingViewer: React.FC<{
  findings: Finding[];
}> = ({ findings }) => {
  const [finding, setFinding] = useState<number>(0);
  console.log({ finding: findings[finding], findings });

  const goNext = () => {
    if (finding === findings.length - 1) {
      setFinding(0);
      return;
    }
    setFinding((prev) => prev + 1);
  };

  const goPrevious = () => {
    if (finding === findings.length - 1) {
      setFinding(0);
      return;
    }
    setFinding((prev) => prev - 1);
  };

  if (findings.length === 0) return <Text>No Findings Here</Text>;

  return (
    <View className="mb-4 flex flex-row flex-nowrap items-center gap-2">
      <Button onPress={goNext} variant={"outline"}>
        <ArrowLeft />
      </Button>
      {findings[finding]?.type === "img" ? <ImageViewer finding={findings[finding]} /> : null}
      <Button onPress={goPrevious} variant={"outline"}>
        <ArrowRight />
      </Button>
    </View>
  );
};

const ImageViewer: React.FC<{ finding: Exclude<Finding, { type: "img" }> }> = ({ finding }) => {
  if (!finding.url) return null;

  console.log(finding);

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

export default FindingViewer;
