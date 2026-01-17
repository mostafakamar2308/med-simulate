import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const CaseHeader: React.FC<{ title?: string }> = ({ title }) => {
  const navigate = useNavigate();

  const goBack = React.useCallback(() => navigate("/"), [navigate]);

  return (
    <div className="flex-row justify-between">
      <div>
        <div className="flex flex-row items-center gap-2">
          <button onClick={goBack}>
            <ChevronLeft
              strokeWidth={3}
              width={28}
              height={28}
              className="text-foreground"
            />
          </button>
          <p className="font-display relative z-10 text-2xl font-bold text-foreground">
            {title}
          </p>
        </div>
        {/* <div className="mt-2 flex flex-row items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <p className="text-sm">Est. 10-15 mins</p>
        </div> */}
      </div>
    </div>
  );
};

export default CaseHeader;
