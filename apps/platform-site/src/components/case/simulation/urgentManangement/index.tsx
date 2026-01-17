import React, { useMemo } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Activity, X } from "lucide-react";
import ActionsToTake from "@/components/case/simulation/urgentManangement/ActionsToTake";
import ActionsTaken from "@/components/case/simulation/urgentManangement/ActionsTaken";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface UrgentManagementProps {
  onActionTaken?: (action: ActionTaken) => void;
  takenActions: ActionTaken[];
}

const UrgentManagement: React.FC<UrgentManagementProps> = ({
  onActionTaken,
  takenActions,
}) => {
  const urgentManagementTabs = useMemo(
    () => [
      {
        id: "actions-to-take",
        label: "Actions To Take",
        component: <ActionsToTake onActionTaken={onActionTaken} />,
      },
      {
        id: "actions-taken",
        label: `Actions Taken (${takenActions.length})`,
        component: <ActionsTaken takenActions={takenActions} />,
      },
    ],
    [onActionTaken, takenActions.length],
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
          <p className="text-2xl font-bold text-gray-900">Manage The Patient</p>
          <DialogClose className="p-2">
            <X size={24} color="#000" />
          </DialogClose>
        </DialogHeader>
        {/* <Tabs changeTab={changeTab} activeTab={activeTab} tabs={urgentManagementTabs} /> */}
        <Tabs
          className="p-6 pt-0 grow overflow-auto"
          defaultValue={"actions-to-take"}
        >
          <TabsList>
            {urgentManagementTabs.map((tab) => (
              <TabsTrigger className="p-6 border-2" value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {urgentManagementTabs.map((tab) => (
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

export default UrgentManagement;
