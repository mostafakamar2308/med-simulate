// src/pages/CaseDetail.tsx
import { useParams, useNavigate } from "react-router";
import { useGetCase } from "@med-simulate/api/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExaminationTree } from "@/components/cases/examinationTree";
import { InvestigationsTab } from "@/components/cases/investigationsTab";
import { MediaLibraryEmbed } from "@/components/media/mediaEmbed";
import { ArrowLeft, Edit } from "lucide-react";

export const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCase(id!);
  const caseData = data?.data;

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  if (!caseData) return <div className="p-6 text-center">Case not found</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{caseData.title}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/cases/${id}/edit`)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit Case
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="examinations">Examinations</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Patient:</strong> {caseData.name}, {caseData.age} y/o,{" "}
                {caseData.gender === 0 ? "Male" : "Female"}
              </div>
              <div>
                <strong>Weight/Height:</strong> {caseData.weight} kg /{" "}
                {caseData.height} cm
              </div>
              <div>
                <strong>Speciality:</strong> {caseData.speciality}
              </div>
              <div>
                <strong>Difficulty:</strong>{" "}
                <Badge>{caseData.difficulty}</Badge>
              </div>
              <div>
                <strong>Category:</strong>{" "}
                <Badge variant="outline">{caseData.category}</Badge>
              </div>
              <div className="col-span-2">
                <strong>Chief Complaint:</strong> {caseData.complaint}
              </div>
              <div className="col-span-2">
                <strong>Brief History:</strong> {caseData.briefHistory}
              </div>
              <div className="col-span-2">
                <strong>Objective:</strong> {caseData.objective}
              </div>
              <div className="col-span-2">
                <strong>Actor:</strong> {caseData.actor}
              </div>
              <div className="col-span-2">
                <strong>Diagnosis:</strong> {caseData.diagnosis}
              </div>
              <div className="col-span-2">
                <strong>Differential Diagnosis:</strong> {caseData.differential}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examinations">
          <ExaminationTree caseId={id!} bodySystems={caseData.bodySystems} />
        </TabsContent>

        <TabsContent value="investigations">
          <InvestigationsTab
            caseId={id!}
            investigations={caseData.investigations}
          />
        </TabsContent>

        <TabsContent value="media">
          <MediaLibraryEmbed caseId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
