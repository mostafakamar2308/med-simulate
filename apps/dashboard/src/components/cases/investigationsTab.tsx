// src/components/cases/InvestigationsTab.tsx
import { useState } from "react";
import {
  useAddInvestigation,
  useUpdateInvestigationResult,
  useAddTableData,
  useLinkMediaToInvestigationResult,
} from "@med-simulate/api/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Image, Eye } from "lucide-react";

export const InvestigationsTab = ({
  caseId,
  investigations,
}: {
  caseId: string;
  investigations: any[];
}) => {
  const addInvestigation = useAddInvestigation();
  const updateResult = useUpdateInvestigationResult();
  const addTableData = useAddTableData();
  const linkMedia = useLinkMediaToInvestigationResult();
  const [newInvestigationOpen, setNewInvestigationOpen] = useState(false);
  const [newInvLabel, setNewInvLabel] = useState("");
  const [newInvGuidance, setNewInvGuidance] = useState("");

  const handleAddInvestigation = async () => {
    if (!newInvLabel) return;
    await addInvestigation.mutateAsync({
      caseId,
      payload: { label: newInvLabel, guidance: newInvGuidance || undefined },
    });
    toast.success("Investigation added");
    setNewInvestigationOpen(false);
    setNewInvLabel("");
    setNewInvGuidance("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog
          open={newInvestigationOpen}
          onOpenChange={setNewInvestigationOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" /> Add Investigation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Investigation</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Label</Label>
                <Input
                  value={newInvLabel}
                  onChange={(e) => setNewInvLabel(e.target.value)}
                />
              </div>
              <div>
                <Label>Guidance</Label>
                <Textarea
                  value={newInvGuidance}
                  onChange={(e) => setNewInvGuidance(e.target.value)}
                />
              </div>
              <Button onClick={handleAddInvestigation}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {investigations.map((inv) => (
        <InvestigationCard
          key={inv.id}
          investigation={inv}
          updateResult={updateResult}
          addTableData={addTableData}
          linkMedia={linkMedia}
        />
      ))}
    </div>
  );
};

const InvestigationCard = ({
  investigation,
  updateResult,
  addTableData,
  linkMedia,
}) => {
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

  const handleSaveResult = async () => {
    await updateResult.mutateAsync({ resultId: result.id, payload: form });
    toast.success("Result updated");
    setEditing(false);
  };

  const handleAddRow = async () => {
    await addTableData.mutateAsync({
      resultId: result.id,
      payload: { rows: [newTableRow] },
    });
    toast.success("Row added");
    setNewTableRow({ name: "", value: 0, unit: "", reference: "" });
  };

  const handleLinkMedia = async (mediaId: string) => {
    await linkMedia.mutateAsync({ resultId: result.id, mediaId });
    toast.success("Media linked");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{investigation.label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {investigation.guidance && (
          <p className="text-sm text-muted-foreground">
            {investigation.guidance}
          </p>
        )}
        {result.mediaFileId && (
          <Button variant="outline" size="sm" asChild>
            <a href={`/assets/${result.mediaFile?.diskName}`} target="_blank">
              <Eye className="h-4 w-4 mr-1" /> View Attached Media
            </a>
          </Button>
        )}
        {editing ? (
          <div className="space-y-2">
            <Input
              placeholder="Reference"
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
            />
            <Input
              placeholder="Value"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveResult}>Save</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <MediaPicker onSelect={handleLinkMedia}>
                <Button variant="outline">
                  <Image className="h-4 w-4 mr-1" /> Link Media
                </Button>
              </MediaPicker>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <strong>Reference:</strong> {result.reference || "—"}
            </p>
            <p>
              <strong>Value:</strong> {result.value || "—"}
            </p>
            <p>
              <strong>Description:</strong> {result.description}
            </p>
            <Button variant="link" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </div>
        )}

        <div className="mt-4">
          <h4 className="font-semibold">Table Data</h4>
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
              {result.tableData?.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Name"
              value={newTableRow.name}
              onChange={(e) =>
                setNewTableRow({ ...newTableRow, name: e.target.value })
              }
            />
            <Input
              placeholder="Value"
              type="number"
              value={newTableRow.value}
              onChange={(e) =>
                setNewTableRow({
                  ...newTableRow,
                  value: parseFloat(e.target.value),
                })
              }
            />
            <Input
              placeholder="Unit"
              value={newTableRow.unit}
              onChange={(e) =>
                setNewTableRow({ ...newTableRow, unit: e.target.value })
              }
            />
            <Input
              placeholder="Reference"
              value={newTableRow.reference}
              onChange={(e) =>
                setNewTableRow({ ...newTableRow, reference: e.target.value })
              }
            />
            <Button onClick={handleAddRow} size="sm">
              Add Row
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
