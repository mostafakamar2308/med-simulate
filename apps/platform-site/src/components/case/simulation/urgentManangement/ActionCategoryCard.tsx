import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "purple" | "green" | "orange";
  onClick: () => void;
}

const ActionCategoryCard: React.FC<ActionCategoryCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  const colorConfig = {
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-900",
      textLight: "text-purple-700",
      iconBg: "bg-purple-500",
      chevron: "text-purple-400",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-900",
      textLight: "text-green-700",
      iconBg: "bg-green-500",
      chevron: "text-green-400",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-900",
      textLight: "text-orange-700",
      iconBg: "bg-orange-500",
      chevron: "text-orange-400",
    },
  };

  const config = colorConfig[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex-row items-center gap-4 rounded-2xl border p-5",
        config.bg,
        config.border
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          config.iconBg
        )}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className={cn("font-bold", config.text)}>{title}</p>
        <p className={cn("text-xs", config.textLight)}>{description}</p>
      </div>

      <ChevronRight size={20} className={config.chevron} />
    </button>
  );
};

export default ActionCategoryCard;
