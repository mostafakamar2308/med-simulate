import { useState } from "react";
import {
  useAddInvestigation,
  useUpdateInvestigationResult,
  useAddTableData,
  useLinkMediaToInvestigationResult,
} from "@med-simulate/api/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MediaPicker } from "@/components/media/mediaPicker";
import { toast } from "sonner";
import {
  Plus,
  Image,
  Eye,
  Pencil,
  Save,
  X,
  FileText,
  Activity,
  Table as TableIcon,
} from "lucide-react";
import { resolveBaseUrl } from "@/lib/api";

export const InvestigationsTab = ({
  caseId,
  investigations,
  refetchCase, // optional: to refresh after adding investigation
}: {
  caseId: string;
  investigations: any[];
  refetchCase?: () => void;
}) => {
  const addInvestigation = useAddInvestigation();
  const [newInvestigationOpen, setNewInvestigationOpen] = useState(false);
  const [newInvLabel, setNewInvLabel] = useState("");
  const [newInvGuidance, setNewInvGuidance] = useState("");

  const handleAddInvestigation = async () => {
    if (!newInvLabel.trim()) {
      toast.error("Label is required");
      return;
    }
    try {
      await addInvestigation.mutateAsync({
        caseId,
        payload: {
          label: newInvLabel.trim(),
          guidance: newInvGuidance.trim() || undefined,
        },
      });
      toast.success("Investigation added");
      setNewInvestigationOpen(false);
      setNewInvLabel("");
      setNewInvGuidance("");
      refetchCase?.();
    } catch {
      toast.error("Failed to add investigation");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog
          open={newInvestigationOpen}
          onOpenChange={setNewInvestigationOpen}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Investigation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Investigation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={newInvLabel}
                  onChange={(e) => setNewInvLabel(e.target.value)}
                  placeholder="e.g., Complete Blood Count"
                />
              </div>
              <div>
                <Label htmlFor="guidance">Guidance (optional)</Label>
                <Textarea
                  id="guidance"
                  value={newInvGuidance}
                  onChange={(e) => setNewInvGuidance(e.target.value)}
                  placeholder="Instructions for the student..."
                  rows={3}
                />
              </div>
              <Button onClick={handleAddInvestigation} className="w-full">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {investigations.map((inv) => (
        <InvestigationCard
          key={inv.id}
          investigation={inv}
          refetchCase={refetchCase}
        />
      ))}
      {investigations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No investigations added yet.</p>
          <Button variant="link" onClick={() => setNewInvestigationOpen(true)}>
            Add your first investigation
          </Button>
        </div>
      )}
    </div>
  );
};

const InvestigationCard = ({
  investigation,
  refetchCase,
}: {
  investigation: any;
  refetchCase?: () => void;
}) => {
  const updateResult = useUpdateInvestigationResult();
  const addTableData = useAddTableData();
  const linkMedia = useLinkMediaToInvestigationResult();
  const result = investigation.investigationResult;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    reference: result?.reference || "",
    value: result?.value || "",
    description: result?.description || "",
  });
  const [newTableRow, setNewTableRow] = useState({
    name: "",
    value: 0,
    unit: "",
    reference: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSaveResult = async () => {
    try {
      await updateResult.mutateAsync({ resultId: result.id, payload: form });
      toast.success("Result updated");
      setEditing(false);
      refetchCase?.();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleAddRow = async () => {
    if (!newTableRow.name.trim()) {
      toast.error("Row name is required");
      return;
    }
    try {
      await addTableData.mutateAsync({
        resultId: result.id,
        payload: { rows: [newTableRow] },
      });
      toast.success("Row added");
      setNewTableRow({ name: "", value: 0, unit: "", reference: "" });
      refetchCase?.();
    } catch {
      toast.error("Failed to add row");
    }
  };

  const handleLinkMedia = async (mediaId: string) => {
    try {
      await linkMedia.mutateAsync({ resultId: result.id, mediaId });
      toast.success("Media linked");
      refetchCase?.();
    } catch {
      toast.error("Failed to link media");
    }
  };

  const openPreview = (url: string) => {
    setPreviewUrl(url);
    setPreviewOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="bg-muted/30 border-b p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {investigation.label}
            </CardTitle>
            {!editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Button>
            )}
          </div>
          {investigation.guidance && (
            <p className="text-sm text-muted-foreground mt-1">
              {investigation.guidance}
            </p>
          )}
        </CardHeader>

        <CardContent className="p-4 space-y-5">
          {/* Media Preview - always visible when media exists */}
          {result.mediaFile && (
            <div className="rounded-lg overflow-hidden border bg-muted/20">
              <div className="p-2 bg-muted/30 text-xs font-medium flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Image className="h-3 w-3" /> Attached Media
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() =>
                      openPreview(
                        `${resolveBaseUrl()}/assets/${result.mediaFile.diskName}`,
                      )
                    }
                  >
                    <Eye className="h-3 w-3 mr-1" /> Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    asChild
                  >
                    <a
                      href={`${resolveBaseUrl()}/assets/${result.mediaFile.diskName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in new tab
                    </a>
                  </Button>
                </div>
              </div>
              <div
                className="p-2 flex justify-center bg-black/5 cursor-pointer"
                onClick={() =>
                  openPreview(
                    `${resolveBaseUrl()}/assets/${result.mediaFile.diskName}`,
                  )
                }
              >
                {result.mediaFile.mimeType?.startsWith("image/") ? (
                  <img
                    src={`${resolveBaseUrl()}/assets/${result.mediaFile.diskName}`}
                    alt={result.mediaFile.displayName}
                    className="max-h-48 rounded object-contain hover:opacity-90 transition-opacity"
                  />
                ) : result.mediaFile.mimeType?.startsWith("video/") ? (
                  <video
                    src={`${resolveBaseUrl()}/assets/${result.mediaFile.diskName}`}
                    controls
                    className="max-h-48 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm">
                      {result.mediaFile.displayName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {editing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Reference</Label>
                  <Input
                    value={form.reference}
                    onChange={(e) =>
                      setForm({ ...form, reference: e.target.value })
                    }
                    placeholder="e.g., 4.5-11.0 x10^9/L"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Value</Label>
                  <Input
                    value={form.value}
                    onChange={(e) =>
                      setForm({ ...form, value: e.target.value })
                    }
                    placeholder="e.g., 7.2"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Interpretation or additional notes..."
                  rows={3}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleSaveResult} size="sm" className="gap-1">
                  <Save className="h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(false)}
                  className="gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <MediaPicker onSelect={handleLinkMedia}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Image className="h-4 w-4" />{" "}
                    {result.mediaFile ? "Change Media" : "Link Media"}
                  </Button>
                </MediaPicker>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {result.reference && (
                  <div>
                    <span className="text-muted-foreground">Reference:</span>
                    <Badge variant="secondary" className="ml-2 font-mono">
                      {result.reference}
                    </Badge>
                  </div>
                )}
                {result.value && (
                  <div>
                    <span className="text-muted-foreground">Value:</span>
                    <Badge
                      variant={result.value ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {result.value}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="bg-muted/30 rounded-lg p-3 text-sm">
                {result.description || (
                  <span className="text-muted-foreground italic">
                    No description provided
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Table Data Section */}
          <div className="mt-4 pt-2 border-t">
            <div className="flex items-center gap-2 mb-3">
              <TableIcon className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold">Table Data</h4>
            </div>
            {result.tableData && result.tableData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.tableData.map((row: any) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.value}</TableCell>
                        <TableCell>{row.unit}</TableCell>
                        <TableCell>{row.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No table data added yet.
              </p>
            )}

            {/* Add new row form */}
            <div className="mt-3 p-3 bg-muted/20 rounded-lg">
              <p className="text-xs font-medium mb-2">Add new row</p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <Input
                  placeholder="Name"
                  value={newTableRow.name}
                  onChange={(e) =>
                    setNewTableRow({ ...newTableRow, name: e.target.value })
                  }
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Value"
                  type="number"
                  value={newTableRow.value}
                  onChange={(e) =>
                    setNewTableRow({
                      ...newTableRow,
                      value: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Unit"
                  value={newTableRow.unit}
                  onChange={(e) =>
                    setNewTableRow({ ...newTableRow, unit: e.target.value })
                  }
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Reference"
                  value={newTableRow.reference}
                  onChange={(e) =>
                    setNewTableRow({
                      ...newTableRow,
                      reference: e.target.value,
                    })
                  }
                  className="h-8 text-sm"
                />
              </div>
              <Button
                onClick={handleAddRow}
                size="sm"
                className="mt-2 w-full sm:w-auto"
              >
                Add Row
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Media Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {previewUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] object-contain"
              />
            ) : previewUrl.match(/\.(mp4|webm|mov)$/i) ? (
              <video
                src={previewUrl}
                controls
                autoPlay
                className="max-w-full max-h-[70vh]"
              />
            ) : (
              <p>Unsupported media type</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
