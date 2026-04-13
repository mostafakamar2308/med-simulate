// src/components/case/grading/GradingView.tsx
import React, { useEffect, useState } from "react";
import {
  useGradeHistory,
  useGradeExam,
  useGradeInvestigations,
  useGradeDiagnosis,
} from "@med-simulate/api/hooks";
import { ICase, IGrading } from "@med-simulate/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  caseData: ICase.FullCase;
  submissionData: IGrading.SubmissionData;
}

type SectionStatus = "idle" | "loading" | "success" | "error";

const GradingView: React.FC<Props> = ({ caseData, submissionData }) => {
  // Results
  const [historyResult, setHistoryResult] =
    useState<IGrading.HistoryGradingResponse | null>(null);
  const [examResult, setExamResult] =
    useState<IGrading.ExamGradingResponse | null>(null);
  const [investigationsResult, setInvestigationsResult] =
    useState<IGrading.InvestigationsGradingResponse | null>(null);
  const [diagnosisResult, setDiagnosisResult] =
    useState<IGrading.DiagnosisGradingResponse | null>(null);

  // Status per section
  const [historyStatus, setHistoryStatus] = useState<SectionStatus>("idle");
  const [examStatus, setExamStatus] = useState<SectionStatus>("idle");
  const [investigationsStatus, setInvestigationsStatus] =
    useState<SectionStatus>("idle");
  const [diagnosisStatus, setDiagnosisStatus] = useState<SectionStatus>("idle");

  // Overlay visibility
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);

  const gradeHistory = useGradeHistory();
  const gradeExam = useGradeExam();
  const gradeInvestigations = useGradeInvestigations();
  const gradeDiagnosis = useGradeDiagnosis();

  // Auto‑grade on mount
  useEffect(() => {
    // History
    if (submissionData.chat.length > 0 && historyStatus === "idle") {
      setHistoryStatus("loading");
      gradeHistory.mutate(
        {
          caseId: caseData.id,
          chatHistory: submissionData.chat.map((msg) => ({
            role: msg.sender,
            message: msg.text,
          })),
        },
        {
          onSuccess: (data) => {
            setHistoryResult(data);
            setHistoryStatus("success");
          },
          onError: () => setHistoryStatus("error"),
        },
      );
    } else if (submissionData.chat.length === 0 && historyStatus === "idle") {
      setHistoryStatus("success");
      setHistoryResult({
        score: 0,
        feedback: "No history taken.",
        missingQuestions: [],
        communicationScore: 0,
        explanationScore: 0,
      });
    }

    // Exam
    if (submissionData.examinedAreas.length > 0 && examStatus === "idle") {
      setExamStatus("loading");
      const examinedAreas = submissionData.examinedAreas.map((area) => ({
        areaLabel: area.areaLabel,
        userInterpretation: area.userInterpretation,
      }));
      gradeExam.mutate(
        { caseId: caseData.id, examinedAreas },
        {
          onSuccess: (data) => {
            setExamResult(data);
            setExamStatus("success");
          },
          onError: () => setExamStatus("error"),
        },
      );
    } else if (
      submissionData.examinedAreas.length === 0 &&
      examStatus === "idle"
    ) {
      setExamStatus("success");
      setExamResult({
        score: 0,
        feedback: "No examination performed.",
        examinedAreasCount: 0,
        correctInterpretations: 0,
        missedAreas: [],
      });
    }

    // Investigations
    if (
      submissionData.orderedInvestigations.length > 0 &&
      investigationsStatus === "idle"
    ) {
      setInvestigationsStatus("loading");
      gradeInvestigations.mutate(
        {
          caseId: caseData.id,
          orderedInvestigationIds: submissionData.orderedInvestigations.map(
            (inv) => inv.id,
          ),
        },
        {
          onSuccess: (data) => {
            setInvestigationsResult(data);
            setInvestigationsStatus("success");
          },
          onError: () => setInvestigationsStatus("error"),
        },
      );
    } else if (
      submissionData.orderedInvestigations.length === 0 &&
      investigationsStatus === "idle"
    ) {
      setInvestigationsStatus("success");
      setInvestigationsResult({
        score: 0,
        feedback: "No investigations ordered.",
        orderedCount: 0,
        appropriateOrders: false,
        missingImportant: [],
      });
    }

    // Diagnosis
    if (submissionData.diagnosis.primary && diagnosisStatus === "idle") {
      setDiagnosisStatus("loading");
      gradeDiagnosis.mutate(
        {
          caseId: caseData.id,
          finalDiagnosis: submissionData.diagnosis.primary,
          differentials: submissionData.diagnosis.differentials,
        },
        {
          onSuccess: (data) => {
            setDiagnosisResult(data);
            setDiagnosisStatus("success");
          },
          onError: () => setDiagnosisStatus("error"),
        },
      );
    } else if (
      !submissionData.diagnosis.primary &&
      diagnosisStatus === "idle"
    ) {
      setDiagnosisStatus("success");
      setDiagnosisResult({
        score: 0,
        feedback: "No diagnosis provided.",
        isCorrect: false,
        differentialsQuality: "None",
      });
    }
  }, []);

  const allSectionsCompleted = [
    historyStatus,
    examStatus,
    investigationsStatus,
    diagnosisStatus,
  ].every((s) => s === "success" || s === "error");

  useEffect(() => {
    if (allSectionsCompleted) {
      const timer = setTimeout(() => setShowLoadingOverlay(false), 300);
      return () => clearTimeout(timer);
    }
  }, [allSectionsCompleted]);

  const overallScore = (() => {
    const scores = [];
    if (historyResult) scores.push(historyResult.score);
    if (examResult) scores.push(examResult.score);
    if (investigationsResult) scores.push(investigationsResult.score);
    if (diagnosisResult) scores.push(diagnosisResult.score);
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  })();

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const retryHistory = () => {
    setHistoryStatus("loading");
    gradeHistory.mutate(
      {
        caseId: caseData.id,
        chatHistory: submissionData.chat.map((msg) => ({
          role: msg.sender,
          message: msg.text,
        })),
      },
      {
        onSuccess: (data) => {
          setHistoryResult(data);
          setHistoryStatus("success");
        },
        onError: () => setHistoryStatus("error"),
      },
    );
  };

  const completedCount = [
    historyStatus,
    examStatus,
    investigationsStatus,
    diagnosisStatus,
  ].filter((s) => s === "success" || s === "error").length;

  return (
    <div className="relative min-h-screen">
      {/* Full‑page loading overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-300 dark:bg-gray-900/95",
          showLoadingOverlay
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium">Grading your performance...</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Section {completedCount} of 4 completed
        </p>
      </div>

      {/* Main content (hidden behind overlay until fade‑out) */}
      <div className="container mx-auto p-6 space-y-6">
        {/* Header with overall score */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Grading & Feedback</h1>
          {allSectionsCompleted && (
            <div
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2 shadow-sm",
                getScoreColor(overallScore),
              )}
            >
              <Award className="h-5 w-5" />
              <span className="font-bold">
                Overall Score: {overallScore.toFixed(1)}/10
              </span>
            </div>
          )}
        </div>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="exam">Physical Exam</TabsTrigger>
            <TabsTrigger value="investigations">Investigations</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          </TabsList>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>History Taking</CardTitle>
                {historyStatus === "loading" && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
                {historyStatus === "error" && (
                  <Button variant="outline" size="sm" onClick={retryHistory}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Retry
                  </Button>
                )}
                {historyResult && (
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      getScoreColor(historyResult.score),
                    )}
                  >
                    Score: {historyResult.score}/10
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Chat Transcript</h3>
                  <ScrollArea className="h-64 border rounded p-4 mt-2">
                    {submissionData.chat.map((msg, idx) => (
                      <div key={idx} className="mb-2">
                        <span className="font-bold">
                          {msg.sender === "doctor" ? "You" : "Patient"}:
                        </span>{" "}
                        {msg.text}
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                {historyResult && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p>
                      <strong>Feedback:</strong> {historyResult.feedback}
                    </p>
                    <p>
                      <strong>Missing questions:</strong>{" "}
                      {historyResult.missingQuestions.join(", ")}
                    </p>
                    <p>
                      <strong>Communication score:</strong>{" "}
                      {historyResult.communicationScore}/10
                    </p>
                    <p>
                      <strong>Explanation score:</strong>{" "}
                      {historyResult.explanationScore}/10
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Tab */}
          <TabsContent value="exam">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Physical Examination</CardTitle>
                {examStatus === "loading" && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
                {examResult && (
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      getScoreColor(examResult.score),
                    )}
                  >
                    Score: {examResult.score}/10
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {submissionData.examinedAreas.map((area, idx) => (
                    <div key={idx} className="border-b pb-2">
                      <p>
                        <strong>{area.areaLabel}</strong> ({area.systemLabel} -{" "}
                        {area.techniqueLabel})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your finding: {area.userInterpretation}
                      </p>
                      <p className="text-sm">
                        Official: {area.officialDescription}
                      </p>
                    </div>
                  ))}
                </div>
                {examResult && (
                  <div className="bg-muted p-4 rounded-lg mt-4 space-y-2">
                    <p>
                      <strong>Feedback:</strong> {examResult.feedback}
                    </p>
                    <p>
                      <strong>Examined areas:</strong>{" "}
                      {examResult.examinedAreasCount}
                    </p>
                    <p>
                      <strong>Correct interpretations:</strong>{" "}
                      {examResult.correctInterpretations}
                    </p>
                    <p>
                      <strong>Missed areas:</strong>{" "}
                      {examResult.missedAreas.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investigations Tab */}
          <TabsContent value="investigations">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Investigations Ordered</CardTitle>
                {investigationsStatus === "loading" && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
                {investigationsResult && (
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      getScoreColor(investigationsResult.score),
                    )}
                  >
                    Score: {investigationsResult.score}/10
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-semibold">Ordered:</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {submissionData.orderedInvestigations.map((inv, idx) => (
                      <Badge key={idx} variant="outline">
                        {inv.label}
                      </Badge>
                    ))}
                    {submissionData.orderedInvestigations.length === 0 && (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </div>
                </div>
                {investigationsResult && (
                  <div className="bg-muted p-4 rounded-lg mt-4 space-y-2">
                    <p>
                      <strong>Feedback:</strong> {investigationsResult.feedback}
                    </p>
                    <p>
                      <strong>Appropriate orders:</strong>{" "}
                      {investigationsResult.appropriateOrders ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Missing important tests:</strong>{" "}
                      {investigationsResult.missingImportant.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diagnosis Tab */}
          <TabsContent value="diagnosis">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Diagnosis</CardTitle>
                {diagnosisStatus === "loading" && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
                {diagnosisResult && (
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1",
                      getScoreColor(diagnosisResult.score),
                    )}
                  >
                    Score: {diagnosisResult.score}/10
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Primary diagnosis:</p>
                  <p>{submissionData.diagnosis.primary}</p>
                </div>
                <div>
                  <p className="font-semibold">Differentials:</p>
                  <ul className="list-disc pl-5">
                    {submissionData.diagnosis.differentials.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
                {diagnosisResult && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p>
                      <strong>Feedback:</strong> {diagnosisResult.feedback}
                    </p>
                    <p>
                      <strong>Correct:</strong>{" "}
                      {diagnosisResult.isCorrect ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Differentials quality:</strong>{" "}
                      {diagnosisResult.differentialsQuality}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GradingView;
