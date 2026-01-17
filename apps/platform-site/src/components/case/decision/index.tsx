import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Building2, DoorOpen, Home, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type DecisionItem = "admit" | "discharge";

type DecisionProps = {
  patientName: string;
  onDecision: (decision: DecisionItem) => void;
};

type Decision = {
  id: DecisionItem;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const decisions: Decision[] = [
  {
    id: "discharge",
    label: "Discharge",
    description: "Send Patient Home",
    icon: <Home width={24} height={24} color={"#16a34a"} />,
  },
  {
    id: "admit",
    label: "Admit",
    description: "Admit to Hospital",
    icon: <Building2 width={24} height={24} color={"#2563eb"} />,
  },
];

const Decision: React.FC<DecisionProps> = ({ patientName, onDecision }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "items-center justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
          "p-8 flex flex-col border-white/50 bg-white/90",
        )}
      >
        <DoorOpen className="h-6 w-6 opacity-80" />
        <p className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
          Decide
        </p>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="justify-between w-full flex  flex-row bg-slate-800 p-6">
          <div className="flex flex-col gap-2">
            <div className="flex-row flex items-center gap-2">
              <AlertCircle color={"#fbbf24"} width={24} height={24} />
              <p className="font-display text-xl font-bold text-white">
                Final Decision
              </p>
            </div>
            <p className="text-sm text-white/70">
              Based on your assessment, what is your disposition for{" "}
              <span className="font-bold text-white">{patientName}</span>?
            </p>
          </div>
          <DialogClose>
            <X className="text-white" />
          </DialogClose>
        </DialogHeader>
        {decisions.map((item) => (
          <Button
            className="mb-2 h-full mx-4 cursor-pointer flex-1 flex items-center justify-center p-4"
            variant={"outline"}
            key={item.id}
            onClick={() => onDecision(item.id)}
          >
            <div className="flex-1 flex-row flex items-center justify-center gap-3">
              <div
                className={cn(
                  "h-12 w-12 items-center justify-center flex rounded-3xl",
                  item.id === "admit" ? "bg-blue-100" : "bg-green-100",
                )}
              >
                {item.icon}
              </div>
              <div className="gap-1">
                <p className="text-lg font-bold text-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Button>
        ))}{" "}
        <p className="py-2 text-center text-xs text-muted-foreground">
          This decision will affect your final score
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default Decision;
