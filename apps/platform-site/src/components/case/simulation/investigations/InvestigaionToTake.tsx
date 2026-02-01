import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { InvestigationListProps } from "@/components/case/simulation/investigations/types";
import { ICase } from "@med-simulate/types";

const InvestigaionToTake: React.FC<InvestigationListProps> = ({
  investigations,
  onTakeInvestigation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [item, setItem] = useState<ICase.Investigation | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return investigations.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [investigations, searchQuery]);

  useEffect(() => {
    const timout = setTimeout(() => {
      setItem(null);
    }, 20_000);

    return () => {
      clearTimeout(timout);
    };
  }, [item]);

  const handleSelectAction = (item: ICase.Investigation) => {
    if (onTakeInvestigation) {
      const now = new Date();
      const action = {
        ...item,
        timeStamp: now.toString(),
      };
      onTakeInvestigation(action);
    }
    setItem(item);
  };

  return (
    <div className="flex-1 flex flex-col justify-stretch gap-2">
      <div className="flex-row flex items-center">
        <Input
          placeholder={`Search investigations...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-gray-800 border-none active:outline-0! focus:outline-0!"
          autoFocus
        />
      </div>
      {item ? <ResultViewer item={item} /> : null}
      <List items={filteredItems} onClick={handleSelectAction} />
    </div>
  );
};

const ResultViewer: React.FC<{ item: ICase.Investigation }> = ({ item }) => {
  return (
    <div className="justify-center gap-4 bg-secondary-foreground rounded-2xl flex flex-col p-2">
      <p className="text-xl text-white">{item.label}:</p>

      <div>
        <div className="flex-row flex items-center justify-center gap-2">
          <p className="text-lg font-bold text-white">
            {item.investigationResult.value}{" "}
          </p>
          {item.investigationResult.reference ? (
            <p className="text-sm text-white">
              ({item.investigationResult.reference})
            </p>
          ) : null}
        </div>
        <p className="text-center font-bold text-white">
          {item.investigationResult.description}
        </p>
      </div>
    </div>
  );
};

const List: React.FC<{
  items: ICase.Investigation[];
  onClick: (item: ICase.Investigation) => void;
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
            {item.label || "No name"}
          </p>
        </button>
      ))}
    </div>
  );
};

export default InvestigaionToTake;
