import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  FileSearch,
  FlaskConical,
  Check,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  InvestigationListProps,
  TakenInvestigation,
} from "@/components/case/simulation/investigations/types";
import { ICase } from "@med-simulate/types";

// Helper to track status of each card
type CardStatus = "hidden" | "revealed" | "ordered";

const InvestigaionToTake: React.FC<InvestigationListProps> = ({
  investigations,
  onTakeInvestigation,
}) => {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  // We track the status of every investigation by ID
  const [cardStatuses, setCardStatuses] = useState<Record<string, CardStatus>>(
    {},
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase();

    // Find items that match the search AND are currently hidden
    // Note: In a real app, you might want an 'aliases' field in your data (e.g. "CXR" for "Chest X-Ray")
    const matches = investigations.filter((inv) =>
      inv.label.toLowerCase().includes(searchTerm),
    );

    if (matches.length > 0) {
      const newStatuses = { ...cardStatuses };
      let newlyRevealedCount = 0;

      matches.forEach((match) => {
        // Only reveal if it was previously hidden (undefined means hidden in our map logic)
        if (!newStatuses[match.id] || newStatuses[match.id] === "hidden") {
          newStatuses[match.id] = "revealed";
          newlyRevealedCount++;
        }
      });

      if (newlyRevealedCount > 0) {
        setCardStatuses(newStatuses);
        setFeedback({
          msg: `Found ${newlyRevealedCount} relevant investigation(s)!`,
          type: "success",
        });
        setQuery(""); // Clear input on success
      } else {
        setFeedback({
          msg: "You have already revealed these items.",
          type: "error",
        });
      }
    } else {
      setFeedback({
        msg: "Investigation not available for this patient.",
        type: "error",
      });
    }

    // Clear feedback after 3s
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOrder = (item: ICase.Investigation) => {
    if (onTakeInvestigation) {
      const now = new Date();
      const action: TakenInvestigation = {
        ...item,
        timeStamp: now.toString(),
      };
      onTakeInvestigation(action);

      // Mark as ordered
      setCardStatuses((prev) => ({
        ...prev,
        [item.id]: "ordered",
      }));
    }
  };

  return (
    <div className="flex overflow-auto h-full flex-col gap-6">
      <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-6 border border-slate-200 shadow-inner">
        <label className="text-sm font-semibold text-slate-600 mb-1 flex items-center gap-2">
          <FileSearch size={16} />
          Find Required Investigations
        </label>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g. 'CBC', 'X-Ray', 'ECG'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-white border-slate-300 focus-visible:ring-blue-500"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Check Availability
          </Button>
        </form>

        {/* Feedback Message Area */}
        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "text-sm font-medium flex items-center gap-2",
                  feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-500",
                )}
              >
                {feedback.type === "success" ? (
                  <Check size={14} />
                ) : (
                  <AlertCircle size={14} />
                )}
                {feedback.msg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ScrollArea className="flex-1 -mr-4 pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {investigations.map((item) => {
            const status = cardStatuses[item.id] || "hidden";
            return (
              <PuzzleCard
                key={item.id}
                item={item}
                status={status}
                onOrder={() => handleOrder(item)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

const PuzzleCard: React.FC<{
  item: ICase.Investigation;
  status: CardStatus;
  onOrder: () => void;
}> = ({ item, status, onOrder }) => {
  const isHidden = status === "hidden";
  const isOrdered = status === "ordered";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "relative h-32 overflow-hidden transition-all duration-300",
          isHidden
            ? "border-dashed border-2 border-slate-300 bg-slate-50/50"
            : "border-solid border-blue-200 bg-white shadow-md hover:shadow-lg",
        )}
      >
        <div className="p-4 h-full flex flex-col items-center justify-center text-center gap-3">
          {/* Icon State */}
          <div
            className={cn(
              "rounded-full p-2 transition-colors",
              isHidden
                ? "bg-slate-200 text-slate-400"
                : "bg-blue-100 text-blue-600",
            )}
          >
            {isHidden ? <HelpCircle size={24} /> : <FlaskConical size={24} />}
          </div>

          {/* Text State */}
          {isHidden ? (
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-slate-400 tracking-wider">
                UNKNOWN
              </span>
              <span className="text-[10px] text-slate-400 uppercase">
                Investigation #{item.id.slice(0, 3)}
              </span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center gap-2"
            >
              <span className="font-bold text-slate-900 line-clamp-1">
                {item.label}
              </span>

              {isOrdered ? (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100"
                >
                  <Check size={12} className="mr-1" /> Ordered
                </Badge>
              ) : (
                <Button
                  size="sm"
                  className="w-full max-w-[120px] bg-blue-600 h-8 text-xs"
                  onClick={onOrder}
                >
                  Order Now
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export const ResultContent: React.FC<{ result: ICase.InvestigationResult }> = ({
  result,
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Show single value if it exists (e.g. Troponin) */}
      {result.value && (
        <div className="flex items-baseline gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <span className="text-3xl font-bold tracking-tight text-slate-900">
            {result.value}
          </span>
          {result.reference && (
            <span className="text-sm text-muted-foreground font-medium">
              (Ref: {result.reference})
            </span>
          )}
        </div>
      )}

      {/* 2. Show Table for panels (e.g. CBC, BMP) */}
      {result.tableData && result.tableData.length > 0 && (
        <div className="border rounded-lg overflow-hidden border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-2">Parameter</th>
                <th className="px-4 py-2">Value</th>
                <th className="px-4 py-2 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.tableData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-2.5 font-medium text-slate-700">
                    {row.name}
                  </td>
                  <td className="px-4 py-2.5 font-mono font-bold text-blue-700">
                    {row.value}{" "}
                    <span className="text-[10px] font-normal text-slate-400">
                      {row.unit}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                    {row.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Images (X-Rays, ECGs) */}
      {result.imageUrl && (
        <div className="rounded-xl overflow-hidden border shadow-inner bg-slate-100">
          <img
            src={result.imageUrl}
            alt="Lab Result"
            className="w-full h-auto object-contain max-h-[400px]"
          />
        </div>
      )}

      <div className="pt-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">
          Clinical Interpretation
        </h4>
        <p className="text-sm leading-relaxed text-slate-700 italic border-l-2 border-slate-200 pl-3">
          {result.description}
        </p>
      </div>
    </div>
  );
};

export default InvestigaionToTake;
