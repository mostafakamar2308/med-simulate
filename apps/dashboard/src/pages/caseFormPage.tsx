// src/pages/CaseFormPage.tsx
import { useParams, useNavigate } from "react-router";
import { useGetCase } from "@med-simulate/api/hooks";
import { CaseForm } from "@/components/cases/caseForm";
import { Skeleton } from "@/components/ui/skeleton";

export const CaseFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCase(id!);
  const caseData = data?.data;

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  if (!caseData && id) return <div>Case not found</div>;

  return (
    <div className="container max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Case" : "Create New Case"}
      </h1>
      <CaseForm
        initialValues={caseData ? { id: caseData.id, ...caseData } : undefined}
        onSuccess={() => navigate(id ? `/cases/${id}` : "/cases")}
        onCancel={() => navigate(id ? `/cases/${id}` : "/cases")}
      />
    </div>
  );
};
