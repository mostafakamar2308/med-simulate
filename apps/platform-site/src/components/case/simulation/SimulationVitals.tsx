import { Activity, Droplets, HeartPulse, Wind } from "lucide-react";

const SimulationVitals = () => {
  return (
    <div className="w-full border-t border-gray-300 bg-white/90 p-4 shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="flex w-1/4 flex-col items-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <Activity className="h-4 w-4" color={"#3b82f6"} />
            <p className="text-base font-bold uppercase text-blue-500">BP</p>
          </div>
          <p className="font-mono text-lg font-bold leading-none text-gray-900">
            120/80
          </p>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex w-1/4 flex-col items-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <HeartPulse className="h-4 w-4 text-rose-500" color={"#f43f5e"} />
            <p className="text-base font-bold uppercase text-rose-500">HR</p>
          </div>
          <p className="font-mono text-lg font-bold leading-none text-gray-900">
            88
          </p>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex w-1/4 flex-col items-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <Wind className="h-4 w-4 text-sky-500" color={"#0ea5e9"} />
            <p className="text-base font-bold uppercase text-sky-500">RR</p>
          </div>
          <p className="font-mono text-lg font-bold leading-none text-gray-900">
            16
          </p>
        </div>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex w-1/4 flex-col items-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <Droplets className="h-4 w-4 text-indigo-500" color={"#6366f1"} />
            <p className="text-base font-bold uppercase text-indigo-500">Sat</p>
          </div>
          <p className="font-mono text-lg font-bold leading-none text-gray-900">
            98%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationVitals;
