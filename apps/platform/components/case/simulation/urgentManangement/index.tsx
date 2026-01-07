import React, { useCallback, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Tabs, { Tab } from "@/components/ui/tabs";
import { X } from "lucide-react-native";
import ActionsToTake from "@/components/case/simulation/urgentManangement/ActionsToTake";
import ActionsTaken from "@/components/case/simulation/urgentManangement/ActionsTaken";
import { ActionTaken } from "@/components/case/simulation/urgentManangement/types";

type UrgentManagementTabId = "actions-to-take" | "actions-taken";

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
  const [activeTab, setActiveTab] = useState<UrgentManagementTabId>("actions-to-take");

  const changeTab = useCallback((id: string) => {
    setActiveTab(id as UrgentManagementTabId);
  }, []);

  const urgentManagementTabs: Tab[] = useMemo(
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader className="flex flex-row items-center justify-between p-6">
        <Text className="text-2xl font-bold text-gray-900">Manage The Patient</Text>
        <Pressable onPress={onClose} className="p-2">
          <X size={24} color="#000" />
        </Pressable>
      </DialogHeader>
      <DialogContent>
        <Tabs changeTab={changeTab} activeTab={activeTab} tabs={urgentManagementTabs} />
      </DialogContent>
    </Dialog>
  );
};

export default UrgentManagement;
