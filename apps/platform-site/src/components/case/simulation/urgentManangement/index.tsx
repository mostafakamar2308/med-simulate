import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react";
import ActionsToTake from "@/components/case/simulation/urgentManangement/ActionsToTake";
import ActionsTaken from "@/components/case/simulation/urgentManangement/ActionsTaken";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UrgentManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onActionTaken?: (action: ActionTaken) => void;
  takenActions: ActionTaken[];
}

const UrgentManagement: React.FC<UrgentManagementProps> = ({
  isOpen,
  onClose,
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
    [onActionTaken, takenActions.length]
  );

  return (
    <Dialog open={isOpen}>
      <DialogHeader className="flex flex-row items-center justify-between p-6">
        <p className="text-2xl font-bold text-gray-900">Manage The Patient</p>
        <button onClick={onClose} className="p-2">
          <X size={24} color="#000" />
        </button>
      </DialogHeader>
      <DialogContent>
        {/* <Tabs changeTab={changeTab} activeTab={activeTab} tabs={urgentManagementTabs} /> */}
        <Tabs defaultValue={"actions-to-take"}>
          <TabsList>
            {urgentManagementTabs.map((tab) => (
              <TabsTrigger value={tab.id}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {urgentManagementTabs.map((tab) => (
            <TabsContent value={tab.id}>{tab.component}</TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UrgentManagement;
