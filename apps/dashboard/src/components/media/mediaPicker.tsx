// src/components/media/MediaPicker.tsx
import { useState } from "react";
import { useListMedia } from "@med-simulate/api/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { resolveBaseUrl } from "@/lib/api";

interface MediaPickerProps {
  children: React.ReactNode;
  onSelect: (mediaId: string) => void;
}

export const MediaPicker = ({ children, onSelect }: MediaPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = useListMedia({ search, page: 1, limit: 50 });
  const files = data?.files || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ScrollArea className="h-96">
          <div className="grid grid-cols-2 gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="border rounded p-2 cursor-pointer hover:bg-muted"
                onClick={() => {
                  onSelect(file.id);
                  setOpen(false);
                }}
              >
                <div className="text-sm font-medium truncate">
                  {file.displayName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {file.mimeType.split("/")[0]}
                </div>
                {file.mimeType.startsWith("image/") && (
                  <img
                    src={`${resolveBaseUrl()}${file.url}`}
                    className="h-20 w-full object-cover mt-1"
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
