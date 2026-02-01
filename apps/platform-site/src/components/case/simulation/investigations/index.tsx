import React, { useMemo } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Activity, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import InvestigationsToTake from "@/components/case/simulation/investigations/InvestigaionToTake";
import { ICase } from "@med-simulate/types";
import InvestigationsTaken from "./InvestigationsTaken";
import { TakenInvestigation } from "./types";

interface UrgentManagementProps {
  onTakeInvestigation?: (inv: TakenInvestigation) => void;
  takenInvestigations: TakenInvestigation[];
  investigations: ICase.Investigation[];
}

const InvestigationsSuite: React.FC<UrgentManagementProps> = ({
  onTakeInvestigation,
  takenInvestigations,
  investigations,
}) => {
  const InvestigationsSuiteTabs = useMemo(
    () => [
      {
        id: "investigations-to-take",
        label: "Investigations To Take",
        component: (
          <InvestigationsToTake
            investigations={investigations}
            onTakeInvestigation={onTakeInvestigation}
          />
        ),
      },
      {
        id: "investigations-taken",
        label: `investigations Taken (${takenInvestigations.length})`,
        component: (
          <InvestigationsTaken takenInvestigations={takenInvestigations} />
        ),
      },
    ],
    [onTakeInvestigation, takenInvestigations.length],
  );

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "items-center justify-center gap-2 rounded-2xl border p-4 shadow-sm transition-all",
          "p-8 flex flex-col border-white/50 bg-white/90",
        )}
      >
        <Activity className="h-6 w-6 opacity-80" />
        <p className="line-clamp-2 text-center text-[11px] font-bold uppercase tracking-wider opacity-80">
          Manage Patient
        </p>
      </DialogTrigger>
      <DialogContent className="h-3/4 flex flex-col" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-0">
          <p className="text-2xl font-bold text-gray-900">
            Get Investigations for The Patient
          </p>
          <DialogClose className="p-2">
            <X size={24} color="#000" />
          </DialogClose>
        </DialogHeader>
        {/* <Tabs changeTab={changeTab} activeTab={activeTab} tabs={InvestigationsSuiteTabs} /> */}
        <Tabs
          className="p-6 pt-0 grow overflow-auto"
          defaultValue={"investigations-to-take"}
        >
          <TabsList>
            {InvestigationsSuiteTabs.map((tab) => (
              <TabsTrigger className="p-6 border-2" value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {InvestigationsSuiteTabs.map((tab) => (
            <TabsContent
              className="mt-2 h-full max-h-full overflow-auto"
              value={tab.id}
            >
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InvestigationsSuite;
