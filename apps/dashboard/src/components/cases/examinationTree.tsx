// src/components/cases/ExaminationTree.tsx
import { useState } from "react";
import {
  useUpdateFinding,
  useGetFindingForArea,
  useLinkMediaToFinding,
} from "@med-simulate/api/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaPicker } from "@/components/media/mediaPicker";
import { toast } from "sonner";
import { Eye, Image } from "lucide-react";

export const ExaminationTree = ({
  caseId,
  bodySystems,
}: {
  caseId: string;
  bodySystems: any[];
}) => {
  return (
    <div className="space-y-6">
      {bodySystems.map((system) => (
        <Card key={system.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{system.icon}</span> {system.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {system.examinationTechniques.map((technique: any) => (
              <div key={technique.id}>
                <h3 className="font-semibold text-lg">{technique.label}</h3>
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {technique.examinationAreas.map((area: any) => (
                    <FindingCard key={area.id} area={area} />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FindingCard = ({ area }: { area: any }) => {
  const { data: findingData, refetch } = useGetFindingForArea(area.id);
  const updateFinding = useUpdateFinding();
  const linkMedia = useLinkMediaToFinding();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    type: "text",
    normal: false,
    description: "",
  });

  const finding = findingData?.data;
  const hasFinding = !!finding;

  const handleSave = async () => {
    if (!finding) return;
    try {
      await updateFinding.mutateAsync({
        findingId: finding.id,
        payload: {
          type: form.type as any,
          normal: form.normal,
          description: form.description,
        },
      });
      toast.success("Finding saved");
      setIsEditing(false);
      refetch();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleLinkMedia = async (mediaId: string) => {
    if (!finding) return;
    await linkMedia.mutateAsync({ findingId: finding.id, mediaId });
    toast.success("Media linked");
    refetch();
  };

  // Preload form when finding loads
  if (finding && !isEditing && !form.description) {
    setForm({
      type: finding.type,
      normal: finding.normal || false,
      description: finding.description || "",
    });
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/10">
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{area.label}</h4>
        {hasFinding && finding.mediaFileId && (
          <Button variant="ghost" size="sm" asChild>
            <a
              href={`/assets/${finding.mediaFile?.diskName}`}
              target="_blank"
              rel="noreferrer"
            >
              <Eye className="h-4 w-4 mr-1" /> View Media
            </a>
          </Button>
        )}
      </div>
      {!hasFinding ? (
        <div className="text-muted-foreground text-sm mt-2">
          Loading finding...
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          {isEditing ? (
            <>
              <div className="space-y-1">
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="img">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="normal"
                  checked={form.normal}
                  onCheckedChange={(c) => setForm({ ...form, normal: !!c })}
                />
                <Label htmlFor="normal">Normal finding</Label>
              </div>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <MediaPicker onSelect={handleLinkMedia}>
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" /> Link Media
                  </Button>
                </MediaPicker>
              </div>
            </>
          ) : (
            <div className="text-sm">
              <p>
                <strong>Type:</strong> {finding.type}
              </p>
              <p>
                <strong>Normal:</strong> {finding.normal ? "Yes" : "No"}
              </p>
              <p>{finding.description}</p>
              <Button
                variant="link"
                size="sm"
                className="px-0"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
