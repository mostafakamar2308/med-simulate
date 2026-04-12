// src/pages/CasesList.ts
import { useState } from "react";
import { useListCases, useDeleteCase } from "@med-simulate/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { CaseForm } from "@/components/cases/caseForm";
import { formatDate } from "@/lib/utils";

export const CasesList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const limit = 10;

  const { data, isLoading, refetch } = useListCases({});
  console.log({ data });

  const deleteCase = useDeleteCase();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!caseToDelete) return;
    try {
      await deleteCase.mutateAsync(caseToDelete);
      toast.success("Case deleted");
      refetch();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteDialogOpen(false);
      setCaseToDelete(null);
    }
  };

  const totalPages = data ? Math.ceil((data.total || 10) / limit) : 0;

  // Filter cases client‑side if needed, or pass filters to API
  const cases = data?.list || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Medical Cases</h1>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
            </DialogHeader>
            <CaseForm
              onSuccess={() => {
                setCreateDialogOpen(false);
                refetch();
              }}
              onCancel={() => setCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search by title/name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={speciality}
          onValueChange={(val) => setSpeciality(val === "all" ? "" : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Speciality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Internal Medicine</SelectItem>
            <SelectItem value="1">Pediatrics</SelectItem>
            <SelectItem value="2">OB/GYN</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={difficulty}
          onValueChange={(val) => setDifficulty(val === "all" ? "" : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Intern</SelectItem>
            <SelectItem value="1">Junior Resident</SelectItem>
            <SelectItem value="2">Senior Resident</SelectItem>
            <SelectItem value="3">Specialist</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={category}
          onValueChange={(val) => setCategory(val === "all" ? "" : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">ER</SelectItem>
            <SelectItem value="1">Inpatient</SelectItem>
            <SelectItem value="2">Outpatient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age/Gender</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    {c.age} / {c.gender === 0 ? "M" : "F"}
                  </TableCell>
                  <TableCell>{c.speciality}</TableCell>
                  <TableCell>
                    <Badge>{c.difficulty}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.category}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(c.createdAt)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/cases/${c.id}`)}
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/cases/${c.id}/edit`)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        setCaseToDelete(c.id);
                        setDeleteDialogOpen(true);
                      }}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && cases.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No cases found. Create one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the case and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
