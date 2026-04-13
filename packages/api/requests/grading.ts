import { Base } from "@/requests/lib/base";
import { IGrading } from "@med-simulate/types";

export class Grading extends Base {
  async gradeHistory(
    payload: IGrading.HistoryGradingInput,
  ): Promise<IGrading.HistoryGradingResponse> {
    return this.post({ route: "/api/v1/grading/history", payload });
  }

  async gradeExam(
    payload: IGrading.ExamGradingInput,
  ): Promise<IGrading.ExamGradingResponse> {
    return this.post({ route: "/api/v1/grading/exam", payload });
  }

  async gradeInvestigations(
    payload: IGrading.InvestigationsGradingInput,
  ): Promise<IGrading.InvestigationsGradingResponse> {
    return this.post({ route: "/api/v1/grading/investigations", payload });
  }

  async gradeDiagnosis(
    payload: IGrading.DiagnosisGradingInput,
  ): Promise<IGrading.DiagnosisGradingResponse> {
    return this.post({ route: "/api/v1/grading/diagnosis", payload });
  }
}
