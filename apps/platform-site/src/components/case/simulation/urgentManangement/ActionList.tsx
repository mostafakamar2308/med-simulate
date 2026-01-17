import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { CONSULTATIONS, TESTS, TREATMENTS } from "@/constants/urgentManagement";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ActionCategory,
  ActionListItem,
  ActionListProps,
} from "@/components/case/simulation/urgentManangement/types";
import {
  isConsultation,
  isInvestigation,
  isTreatment,
} from "@/lib/urgentManagement";
import { Button } from "@/components/ui/button";

const ActionList: React.FC<ActionListProps> = ({
  category,
  onBack,
  onActionTaken,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [item, setItem] = useState<ActionListItem | null>(null);

  const categoryData = useMemo(() => {
    switch (category) {
      case "investigations":
        return TESTS;
      case "treatment":
        return TREATMENTS;
      case "consultation":
        return CONSULTATIONS;
      default:
        return [];
    }
  }, [category]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return categoryData.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
  }, [categoryData, searchQuery]);

  const getCategoryLabel = () => {
    switch (category) {
      case "investigations":
        return "Tests & Scans";
      case "treatment":
        return "Treatments";
      case "consultation":
        return "Consultations";
      default:
        return "";
    }
  };

  useEffect(() => {
    const timout = setTimeout(() => {
      setItem(null);
    }, 20_000);

    return () => {
      clearTimeout(timout);
    };
  }, [item]);

  // const getActionType = () => {
  //   switch (category) {
  //     case "investigations":
  //       return "test";
  //     // case "treatment":
  //     //   return "treatment";
  //     case "consultation":
  //       return "consult";
  //     default:
  //       return "test";
  //   }
  // };

  const handleSelectAction = (item: ActionListItem) => {
    if (onActionTaken) {
      const now = new Date();
      const action = {
        ...item,
        timeStamp: now.toString(),
      };
      onActionTaken(action);
    }
    setItem(item);
  };

  return (
    <div className="flex-1 flex flex-col justify-stretch gap-2">
      <div className="flex-row flex items-center">
        <Button variant={"ghost"} onClick={onBack} className="rounded-sm p-1">
          <ChevronLeft className="w-6! h-6! text-primary" />
        </Button>

        <div className="flex-1">
          <Input
            placeholder={`Search ${getCategoryLabel()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-gray-800 border-none active:outline-0! focus:outline-0!"
            autoFocus
          />
        </div>
      </div>
      {item ? <ResultViewer item={item} /> : null}
      <List
        category={category}
        items={filteredItems}
        onClick={handleSelectAction}
      />
    </div>
  );
};

const ResultViewer: React.FC<{ item: ActionListItem }> = ({ item }) => {
  if (isInvestigation(item))
    return (
      <div className="justify-center gap-4 bg-secondary-foreground rounded-2xl flex flex-col p-2">
        <p className="text-xl text-white">{item.name}:</p>

        {item.result.type === "text" ? (
          <div>
            <p className="text-center font-bold text-white">
              {item.result.value}
            </p>
          </div>
        ) : null}
        {item.result.type === "binary" ? (
          <div>
            <p
              className={cn(
                "p-4 text-center font-bold text-white",
                item.result.value === "positive"
                  ? "bg-destructive"
                  : "bg-primary",
              )}
            >
              {item.result.value}
            </p>
          </div>
        ) : null}

        {item.result.type === "number" ? (
          <div>
            <div className="flex-row flex items-center justify-center gap-2">
              <p className="text-lg font-bold text-white">
                {item.result.value}{" "}
              </p>
              <p className="text-sm text-white">({item.result.reference})</p>
            </div>
            <p className="text-center font-bold text-white">
              {item.result.description}
            </p>
          </div>
        ) : null}

        {item.guidance ? (
          <button className="max-w-fit rounded-lg bg-secondary-foreground p-2">
            <p className="w-fit max-w-fit text-center text-white">
              {item.guidance}
            </p>
          </button>
        ) : null}
      </div>
    );

  if (isConsultation(item))
    return (
      <div className="justify-center gap-4 bg-secondary-foreground p-8">
        <p className="text-xl text-white">{item.name}:</p>
        <p className="text-center font-bold text-white">
          {item.result.description}
        </p>
      </div>
    );

  if (isTreatment(item))
    return (
      <div className="justify-center gap-4 bg-secondary-foreground p-8">
        <p className="text-xl text-white">{item.name}:</p>
        <p className="text-center font-bold text-white">
          {item.result.description}
        </p>
      </div>
    );
};

const List: React.FC<{
  items: ActionListItem[];
  category?: ActionCategory;
  onClick: (item: ActionListItem) => void;
}> = ({ items, onClick }) => {
  return items.length === 0 ? (
    <div className="flex-1 flex items-center justify-center py-12">
      <p className="text-base text-gray-500">
        No items found
        {/* {category === "treatment" ? "Please Search for the correct action" : "No items found"} */}
      </p>
    </div>
  ) : (
    <div className="flex-1 flex flex-col gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onClick(item)}
          className="mb-2 items-center justify-center rounded-lg border-2 border-primary bg-primary/5 py-2 active:bg-primary/10"
        >
          <p className="text-base font-semibold text-primary">
            {item.name || "No name"}
          </p>
        </button>
      ))}
    </div>
  );
};

export default ActionList;
