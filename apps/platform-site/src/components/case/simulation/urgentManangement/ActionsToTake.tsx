import React, { useState } from "react";
import { TestTube, Pill, Users } from "lucide-react";
import ActionCategoryCard from "@/components/case/simulation/urgentManangement/ActionCategoryCard";
import ActionList from "@/components/case/simulation/urgentManangement/ActionList";
import {
  ActionCategory,
  ActionsToTakeProps,
} from "@/components/case/simulation/urgentManangement/types";

const ActionsToTake: React.FC<ActionsToTakeProps> = ({ onActionTaken }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ActionCategory | null>(null);

  if (selectedCategory) {
    return (
      <ActionList
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
        onActionTaken={onActionTaken}
      />
    );
  }

  return (
    <div className="h-full">
      <p className="mb-4 text-xl font-bold text-gray-800">
        Select an action category
      </p>

      <div className="flex flex-col gap-2">
        <ActionCategoryCard
          title="Order Tests & Scans"
          description="Lab work, imaging, and bedside tests"
          icon={<TestTube size={24} color="#ffffff" />}
          color="purple"
          onClick={() => setSelectedCategory("investigations")}
        />

        <ActionCategoryCard
          title="Initiate Treatment"
          description="Medications, IV fluids, and procedures"
          icon={<Pill size={24} color="#ffffff" />}
          color="green"
          onClick={() => setSelectedCategory("treatment")}
        />

        <ActionCategoryCard
          title="Request Consultation"
          description="Specialist input and senior reviews"
          icon={<Users size={24} color="#ffffff" />}
          color="orange"
          onClick={() => setSelectedCategory("consultation")}
        />
      </div>
    </div>
  );
};

export default ActionsToTake;
