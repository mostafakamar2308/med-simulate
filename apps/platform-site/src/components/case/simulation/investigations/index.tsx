import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Activity, ClipboardList, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import InvestigationsToTake from "@/components/case/simulation/investigations/InvestigaionToTake";
import InvestigationsTaken from "./InvestigationsTaken";
import { TakenInvestigation } from "./types";
import { ICase } from "@med-simulate/types";
import { Badge } from "@/components/ui/badge";

interface InvestigationSuiteProps {
  onTakeInvestigation?: (inv: TakenInvestigation) => void;
  takenInvestigations: TakenInvestigation[];
  investigations: ICase.Investigation[];
}

const InvestigationsSuite: React.FC<InvestigationSuiteProps> = ({
  onTakeInvestigation,
  takenInvestigations,
  investigations,
}) => {
  const tabs = useMemo(
    () => [
      {
        id: "order",
        label: "Order Investigations",
        icon: <Search className="mr-2 h-4 w-4" />,
        component: (
          <InvestigationsToTake
            investigations={investigations}
            onTakeInvestigation={onTakeInvestigation}
          />
        ),
      },
      {
        id: "results",
        label: "Results & History",
        icon: <ClipboardList className="mr-2 h-4 w-4" />,
        count: takenInvestigations.length,
        component: (
          <InvestigationsTaken takenInvestigations={takenInvestigations} />
        ),
      },
    ],
    [onTakeInvestigation, takenInvestigations, investigations],
  );

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md",
          "h-32 w-full sm:w-40",
        )}
      >
        <div className="rounded-full bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
          <Activity className="h-6 w-6" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
          Investigations
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-[85vh] flex flex-col gap-0 p-0 overflow-hidden sm:rounded-2xl bg-slate-50">
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Activity className="h-5 w-5 text-blue-600" />
            Patient Investigations
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="order"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                  {tab.icon}
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 px-1.5 text-[10px]"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden bg-white p-6">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="h-full mt-0 data-[state=active]:flex flex-col"
              >
                {tab.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InvestigationsSuite;
