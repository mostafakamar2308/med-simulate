import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { AlertCircle, Building2, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type DecisionItem = "admit" | "discharge";

type DecisionProps = {
  isOpen: boolean;
  patientName: string;
  onDecision: (decision: DecisionItem) => void;
  onClose?: () => void;
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

const Decision: React.FC<DecisionProps> = ({
  isOpen,
  patientName,
  onDecision,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogHeader className="gap-2 bg-slate-800 p-6">
        <div className="flex-row items-center gap-2">
          <AlertCircle color={"#fbbf24"} width={24} height={24} />
          <p className="font-display text-xl font-bold text-white">
            Final Decision
          </p>
        </div>
        <p className="text-sm text-white/70">
          Based on your assessment, what is your disposition for{" "}
          <p className="font-bold text-white">{patientName}</p>?
        </p>
      </DialogHeader>
      <DialogContent className="flex-1 p-6">
        {decisions.map((item) => (
          <Button
            className="mb-2 h-full flex-1 items-center justify-center p-4"
            variant={"outline"}
            key={item.id}
            onClick={() => onDecision(item.id)}
          >
            <div className="flex-1 flex-row items-center justify-center gap-3">
              <div
                className={cn(
                  "h-12 w-12 items-center justify-center rounded-3xl",
                  item.id === "admit" ? "bg-blue-100" : "bg-green-100"
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
        <p className="pt-2 text-center text-xs text-muted-foreground">
          This decision will affect your final score
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default Decision;
