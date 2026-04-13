// src/components/cases/ExaminationTree.tsx
import { useEffect, useState } from "react";
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
import {
  Eye,
  Image,
  Pencil,
  Save,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  Play,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { resolveBaseUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export const ExaminationTree = ({
  bodySystems,
}: {
  caseId: string;
  bodySystems: any[];
}) => {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleSystem = (systemId: string) => {
    setExpandedSystems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(systemId)) {
        newSet.delete(systemId);
      } else {
        newSet.add(systemId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {bodySystems.map((system) => {
        const isExpanded = expandedSystems.has(system.id);
        return (
          <Card key={system.id}>
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSystem(system.id)}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{system.icon}</span>
                  <span>{system.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            {isExpanded && (
              <CardContent className="space-y-4">
                {system.examinationTechniques.map((technique: any) => (
                  <div key={technique.id}>
                    <h3 className="font-semibold text-lg">{technique.label}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {technique.examinationAreas.map((area: any) => (
                        <FindingCard key={area.id} area={area} />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        );
      })}
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

  // Preload form when finding loads (only if not editing)
  useEffect(() => {
    if (finding && !isEditing) {
      setForm({
        type: finding.type,
        normal: finding.normal || false,
        description: finding.description || "",
      });
    }
  }, [finding, isEditing]);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "img":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Play className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (!hasFinding) {
    return (
      <Card className="border-dashed bg-muted/20">
        <CardContent className="p-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-pulse h-4 w-4 rounded-full bg-primary/50" />
            <span>Loading {area.label}...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden transition-all ${finding.normal ? "border-green-200 dark:border-green-800" : "border-amber-200 dark:border-amber-800"}`}
    >
      <CardContent className="p-0">
        {/* Header with area name and status */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-lg">{area.label}</h4>
            {finding.normal ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200"
              >
                <CheckCircle className="h-3 w-3 mr-1" /> Normal
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200"
              >
                <AlertCircle className="h-3 w-3 mr-1" /> Abnormal
              </Badge>
            )}
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
        </div>

        {/* Content area */}
        <div className="p-4 space-y-4">
          {/* Media preview if exists */}
          {finding.mediaFile && (
            <div className="rounded-lg overflow-hidden border bg-muted/20">
              <div className="p-2 bg-muted/30 text-xs font-medium flex items-center justify-between">
                <span className="flex items-center gap-1">
                  {getTypeIcon(finding.type)} Attached Media
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  asChild
                >
                  <a
                    href={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Eye className="h-3 w-3 mr-1" /> Open
                  </a>
                </Button>
              </div>
              <div className="p-2 flex justify-center bg-black/5">
                {finding.mediaFile.mimeType.startsWith("image/") ? (
                  <img
                    src={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
                    alt={finding.mediaFile.displayName}
                    className="max-h-48 rounded object-contain"
                  />
                ) : finding.mediaFile.mimeType.startsWith("video/") ? (
                  <video
                    src={`${resolveBaseUrl()}/assets/${finding.mediaFile.diskName}`}
                    controls
                    className="max-h-48 rounded"
                  />
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm">
                      {finding.mediaFile.displayName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Finding Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => setForm({ ...form, type: v })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">📄 Text</SelectItem>
                      <SelectItem value="img">🖼️ Image</SelectItem>
                      <SelectItem value="audio">🎵 Audio</SelectItem>
                      <SelectItem value="video">🎬 Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 h-full pt-6">
                  <Checkbox
                    id="normal-edit"
                    checked={form.normal}
                    onCheckedChange={(c) => setForm({ ...form, normal: !!c })}
                  />
                  <Label htmlFor="normal-edit" className="cursor-pointer">
                    Normal finding
                  </Label>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the finding..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button onClick={handleSave} size="sm" className="gap-1">
                  <Save className="h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <MediaPicker onSelect={handleLinkMedia}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Image className="h-4 w-4" />{" "}
                    {finding.mediaFile ? "Change Media" : "Link Media"}
                  </Button>
                </MediaPicker>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getTypeIcon(finding.type)}
                  <span className="capitalize">{finding.type}</span>
                </div>
                {finding.mediaFile && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Image className="h-3 w-3" />
                    <span>Media attached</span>
                  </div>
                )}
              </div>
              <div className="bg-muted/30 rounded-lg p-3 text-sm">
                <p className="whitespace-pre-wrap">
                  {finding.description || (
                    <span className="text-muted-foreground italic">
                      No description provided
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
