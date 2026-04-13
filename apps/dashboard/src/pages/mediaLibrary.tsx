import { useState } from "react";
import {
  useListMedia,
  useUploadMedia,
  useUpdateMedia,
  useDeleteMedia,
} from "@med-simulate/api/hooks";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatBytes, formatDate } from "@/lib/utils";
import { resolveBaseUrl } from "@/lib/api";
import {
  Upload,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Video,
  AudioLines,
  FileQuestion,
} from "lucide-react";

const MediaLibrary = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"image" | "video" | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useListMedia({
    search,
    type,
    page,
    limit,
  });
  const uploadMedia = useUploadMedia();
  const updateMedia = useUpdateMedia();
  const deleteMedia = useDeleteMedia();

  // Upload modal state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState("");

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDisplayName, setEditDisplayName] = useState("");

  // Preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewType, setPreviewType] = useState<string>("");

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Helper to show error toasts
  const showErrorToast = (err: unknown, defaultMsg: string) => {
    const message = err instanceof Error ? err.message : defaultMsg;
    toast.error(message);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a file");
      return;
    }
    if (!displayName.trim()) {
      toast.error("Display name is required");
      return;
    }
    try {
      await uploadMedia.mutateAsync({
        media: uploadFile,
        displayName: displayName.trim(),
      });
      toast.success("File uploaded successfully");
      setUploadOpen(false);
      setUploadFile(null);
      setDisplayName("");
      refetch();
    } catch (err) {
      showErrorToast(err, "Upload failed. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!editId || !editDisplayName.trim()) return;
    try {
      await updateMedia.mutateAsync({
        id: editId,
        payload: { displayName: editDisplayName.trim() },
      });
      toast.success("Media updated");
      setEditOpen(false);
      setEditId(null);
      refetch();
    } catch (err) {
      showErrorToast(err, "Update failed. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteMedia.mutateAsync(deleteId);
      toast.success("File deleted");
      refetch();
    } catch (err) {
      showErrorToast(err, "Delete failed. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const openPreview = (url: string, mimeType: string) => {
    setPreviewUrl(url);
    setPreviewType(mimeType);
    setPreviewOpen(true);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  // Loading skeleton rows
  const skeletonRows = Array.from({ length: limit }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-5 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-24" />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-sm border">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Media Library
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage images, videos, and GIFs for your medical cases
            </p>
          </div>
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <Upload className="h-4 w-4" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload a file</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*,video/*,image/gif,audio/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g., Chest X-ray"
                    className="mt-1.5"
                  />
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={uploadMedia.isPending}
                  className="w-full gap-2"
                >
                  {uploadMedia.isPending ? <>Uploading...</> : <>Upload</>}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="search">Search by name</Label>
            <Input
              id="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full"
            />
          </div>
          <div className="w-40 space-y-1.5">
            <Label htmlFor="type">Type</Label>
            <Select
              value={type || "all"}
              onValueChange={(val) => {
                setType(val === "all" ? undefined : (val as "image" | "video"));
                setPage(1);
              }}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[40%]">Display Name</TableHead>
              <TableHead className="w-[15%]">Type</TableHead>
              <TableHead className="w-[15%]">Size</TableHead>
              <TableHead className="w-[20%]">Uploaded</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && skeletonRows}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-destructive py-8"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileQuestion className="h-8 w-8" />
                    <p>Failed to load media</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                    >
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              !isError &&
              data?.files.map((file) => (
                <TableRow
                  key={file.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell
                    className="font-medium text-primary cursor-pointer hover:underline flex items-center gap-2"
                    onClick={() =>
                      openPreview(
                        `${resolveBaseUrl()}/assets/${file.diskName}`,
                        file.mimeType,
                      )
                    }
                  >
                    {file.mimeType.startsWith("image/") && (
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    {file.mimeType.startsWith("audio/") && (
                      <AudioLines className="h-4 w-4 text-muted-foreground" />
                    )}
                    {file.mimeType.startsWith("video/") && (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="truncate">{file.displayName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-xs bg-secondary px-2 py-1 rounded-full">
                      {file.mimeType.split("/")[0]}
                    </span>
                  </TableCell>
                  <TableCell>{formatBytes(file.size)}</TableCell>
                  <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setEditId(file.id);
                        setEditDisplayName(file.displayName);
                        setEditOpen(true);
                      }}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => openDeleteDialog(file.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        openPreview(
                          `${resolveBaseUrl()}assets/${file.diskName}`,
                          file.mimeType,
                        )
                      }
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && !isError && data?.files.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 opacity-30" />
                    <p>No media files found</p>
                    <Button
                      variant="outline"
                      onClick={() => setUploadOpen(true)}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload your first file
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="gap-1"
          >
            Previous
          </Button>
          <span className="py-2 px-4 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="gap-1"
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="editName">Display Name</Label>
              <Input
                id="editName"
                value={editDisplayName}
                onChange={(e) => setEditDisplayName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <Button
              onClick={handleUpdate}
              disabled={updateMedia.isPending}
              className="w-full"
            >
              {updateMedia.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Media Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-75">
            {previewType.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] rounded-lg object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  toast.error("Failed to load image");
                }}
              />
            ) : previewType.startsWith("video/") ? (
              <video
                src={previewUrl}
                controls
                autoPlay
                className="max-w-full max-h-[70vh] rounded-lg"
                onError={() => toast.error("Failed to load video")}
              >
                Your browser does not support the video tag.
              </video>
            ) : previewType.startsWith("audio/") ? (
              <audio
                src={previewUrl}
                controls
                autoPlay
                className="max-w-full max-h-[70vh] rounded-lg"
                onError={() => toast.error("Failed to load audio")}
              >
                Your browser does not support the audio tag.
              </audio>
            ) : (
              <div className="text-center text-muted-foreground">
                <FileQuestion className="h-12 w-12 mx-auto mb-2" />
                <p>Unsupported media type</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              media file from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MediaLibrary;
