import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ICase } from "@med-simulate/types";
import { resolveBaseUrl } from "@/lib/api";
// import AudioPlayer from "@/components/ui/audio";
// import VideoPlayer from "@/components/ui/video";

export const ImageViewer: React.FC<{
  finding: ICase.ExaminationFinding;
}> = ({ finding }) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.mediaFile) return null;

  return (
    <div className="w-full flex-1 space-y-4">
      <img
        src={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
        className="min-h-40 w-full rounded-lg object-contain"
      />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onClick={() => setShowDescription((prev) => !prev)}
      >
        <p>{showDescription ? "Hide Report" : "Show Report"}</p>
      </Button>

      {showDescription && (
        <p className="text-center text-base font-medium text-primary">
          {finding.description}
        </p>
      )}
    </div>
  );
};

export const AudioViewer: React.FC<{ finding: ICase.ExaminationFinding }> = ({
  finding,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.mediaFile) return null;

  return (
    <div className="w-full flex flex-col items-center space-y-4 rounded-lg border border-primary px-4 py-2">
      <audio
        src={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
        className="w-full"
        autoPlay
        controls
      />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onClick={() => setShowDescription((prev) => !prev)}
      >
        <p>{showDescription ? "Hide Explanation" : "Explain Audio"}</p>
      </Button>

      {showDescription && (
        <p className="text-center text-base font-medium text-primary">
          {finding.description}
        </p>
      )}
    </div>
  );
};

export const VideoViewer: React.FC<{ finding: ICase.ExaminationFinding }> = ({
  finding,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.mediaFile) return null;

  return (
    <div className="w-full flex items-center flex-col flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <video
        src={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
        className="w-full"
        controls
        autoPlay
      />

      <Button
        variant="outline"
        size="sm"
        className="rounded-sm"
        onClick={() => setShowDescription((prev) => !prev)}
      >
        <p>{showDescription ? "Hide Explanation" : "Explain Video"}</p>
      </Button>

      {showDescription && (
        <p className="text-center text-base font-medium text-primary">
          {finding.description}
        </p>
      )}
    </div>
  );
};

export const TextViewer: React.FC<{
  finding: ICase.ExaminationFinding;
}> = ({ finding }) => {
  return (
    <div className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <p className="text-center text-xl font-bold text-primary">
        {finding.description}
      </p>
    </div>
  );
};
