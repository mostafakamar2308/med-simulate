import React from "react";
import { Clock } from "lucide-react";
import {
  ActionsTakenProps,
  ActionTaken,
} from "@/components/case/simulation/urgentManangement/types";
import {
  isConsultation,
  isInvestigation,
  isTreatment,
} from "@/lib/urgentManagement";

const ActionsTaken: React.FC<ActionsTakenProps> = ({ takenActions }) => {
  const getResultDisplay = (action: ActionTaken) => {
    if (!action.result) return null;

    if (isInvestigation(action)) {
      switch (action.result.type) {
        case "number":
          return (
            <p className="font-mono">
              <p className="font-bold text-blue-600">{action.result.value}</p>
              {action.result.reference && ` ${action.result.reference}`}
            </p>
          );
        case "text":
          return (
            <p className="font-medium text-gray-900">{action.result.value}</p>
          );
        case "binary":
          return (
            <p className="font-bold text-blue-600">{action.result.value}</p>
          );
        default:
          return null;
      }
    }

    if (isConsultation(action))
      return (
        <p className="text-center font-bold text-green-600">
          {action.result.description}
        </p>
      );

    if (isTreatment(action))
      return (
        <p className="text-center font-bold text-purple-600">
          {action.result.description}
        </p>
      );
  };

  if (takenActions.length === 0) {
    return (
      <div className="flex-col flex items-center justify-center py-20">
        <Clock size={48} color="#374151" />
        <p className="mt-4 items-center justify-center text-2xl text-gray-700">
          Take an action...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 max-h-full">
      <div className="relative max-h-full">
        <div className="absolute bottom-2 left-4 top-2 w-0.5 bg-gray-300" />
        {takenActions.reverse().map((action, idx) => (
          <div
            key={action.timeStamp.toString()}
            className="relative mb-8 pl-10"
          >
            <div className="absolute left-0 top-1 z-10 h-8 w-8 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 bg-white">
              {takenActions.length - idx}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex-row items-start justify-between">
                <p className="text-xs text-gray-500">
                  {new Date(action.timeStamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="mb-2 font-bold text-gray-900">{action.name}</p>
              {action.result && (
                <div className="mt-2 rounded-lg border border-gray-200 bg-white/80 p-2">
                  {getResultDisplay(action)}
                  {isInvestigation(action) && action.result.description && (
                    <p className="mt-1 italic text-gray-600">
                      {action.result.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionsTaken;
