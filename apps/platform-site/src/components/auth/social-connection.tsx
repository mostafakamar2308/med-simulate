import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SOCIAL_CONNECTION_STRATEGIES: {
  type: string;
  source: string;
  useTint?: boolean;
  title: string;
}[] = [
  {
    type: "oauth_google",
    source: "https://img.clerk.com/static/google.png?width=160",
    useTint: false,
    title: "Google",
  },
];

export function SocialConnections() {
  return (
    <div className="gap-2 sm:flex-row flex sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            variant="outline"
            size="sm"
            className="flex-1 cursor-pointer"
            onClick={() => {}}
          >
            <img className={cn("size-4")} src={strategy.source} />
            <p>Sign in Using {strategy.title}</p>
          </Button>
        );
      })}
    </div>
  );
}
