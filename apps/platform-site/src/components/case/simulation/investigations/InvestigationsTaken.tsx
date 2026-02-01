import React from "react";
import { Clock } from "lucide-react";
import { InvestigationTakenProps } from "@/components/case/simulation/investigations/types";

const InvestigationsTaken: React.FC<InvestigationTakenProps> = ({
  takenInvestigations,
}) => {
  if (takenInvestigations.length === 0) {
    return (
      <div className="flex-col flex items-center justify-center py-20">
        <Clock size={48} color="#374151" />
        <p className="mt-4 items-center justify-center text-2xl text-gray-700">
          Take an investigation...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 max-h-full">
      <div className="relative max-h-full">
        <div className="absolute bottom-2 left-4 top-2 w-0.5 bg-gray-300" />
        {takenInvestigations.reverse().map((investigation, idx) => (
          <div
            key={investigation.timeStamp.toString()}
            className="relative mb-8 pl-10"
          >
            <div className="absolute left-0 top-1 z-10 h-8 w-8 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 bg-white">
              {takenInvestigations.length - idx}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex-row items-start justify-between">
                <p className="text-xs text-gray-500">
                  {new Date(investigation.timeStamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="mb-2 font-bold text-gray-900">
                {investigation.label}
              </p>
              {investigation.investigationResult && (
                <div className="mt-2 rounded-lg border border-gray-200 bg-white/80 p-2">
                  <div>
                    <div className="flex-row flex items-center justify-center gap-2">
                      <p className="text-lg font-bold">
                        {investigation.investigationResult.value}{" "}
                      </p>
                      {investigation.investigationResult.reference ? (
                        <p className="text-sm">
                          ({investigation.investigationResult.reference})
                        </p>
                      ) : null}
                    </div>
                    <p className="text-center font-bold">
                      {investigation.investigationResult.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestigationsTaken;
