import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Finding } from "@med-simulate/types";
// import AudioPlayer from "@/components/ui/audio";
// import VideoPlayer from "@/components/ui/video";

export const ImageViewer: React.FC<{
  finding: Exclude<Finding, { type: "img" }>;
}> = ({ finding }) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!finding.url) return null;

  return (
    <div className="w-full flex-1 space-y-4">
      <img
        src={finding.url}
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

// export const AudioViewer: React.FC<{ finding: Exclude<Finding, { type: "audio" }> }> = ({
//   finding,
// }) => {
//   const [showDescription, setShowDescription] = useState(false);

//   if (!finding.url) return null;

//   return (
//     <div className="w-full space-y-4 rounded-lg border border-primary px-4 py-2">
//       <AudioPlayer src={indurl} /

//       <Button
//         variant="outline"
//         size="sm"
//         className="rounded-sm"
//         onClick={() => setShowDescription((prev) => !prev)}>
//         <p>{showDescription ? "Hide Explanation" : "Explain Audio"}</p>
//       </Button>

//       {showDescription && (
//         <p className="text-center text-base font-medium text-primary">
//           {finding.description}
//         </p>
//       )}
//     </div>
//   );
// };

// export const VideoViewer: React.FC<{ finding: Exclude<Finding, { type: "video" }> }> = ({
//   finding,
// }) => {
//   const [showDescription, setShowDescription] = useState(false);

//   if (!finding.url) return null;

//   return (
//     <div className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
//       <VideoPlayer src={indurl} /

//       <Button
//         variant="outline"
//         size="sm"
//         className="rounded-sm"
//         onClick={() => setShowDescription((prev) => !prev)}>
//         <p>{showDescription ? "Hide Explanation" : "Explain Video"}</p>
//       </Button>

//       {showDescription && (
//         <p className="text-center text-base font-medium text-primary">
//           {finding.description}
//         </p>
//       )}
//     </div>
//   );
// };

export const TextViewer: React.FC<{
  finding: Exclude<Finding, { type: "text" }>;
}> = ({ finding }) => {
  return (
    <div className="w-full flex-1 space-y-4 rounded-lg border border-primary px-4 py-2">
      <p className="text-center text-xl font-bold text-primary">
        {finding.description}
      </p>
    </div>
  );
};
