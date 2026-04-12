import { Base } from "@/requests/lib/base";
import { ICase, ApiResponse } from "@med-simulate/types";

export class Case extends Base {
  async findCases(
    params: ICase.FindCasesApiQuery,
  ): Promise<ICase.FindCasesResponse> {
    return this.get({ route: "/api/v1/cases/", params });
  }

  async findCaseById({
    id,
  }: {
    id: string;
  }): Promise<{ data: ICase.FullCase | null }> {
    return this.get({ route: `/api/v1/cases/${id}` });
  }

  // New CRUD methods
  async createCase(
    payload: ICase.CreateCasePayload,
  ): Promise<ApiResponse<Case>> {
    return this.post({ route: "/api/v1/cases", payload });
  }

  async listCases(params: {
    page?: number;
    limit?: number;
  }): Promise<ICase.ListCasesResponse> {
    return this.get({ route: "/api/v1/cases", params });
  }

  async getCase(id: string): Promise<ApiResponse<ICase.FullCase>> {
    return this.get({ route: `/api/v1/cases/${id}` });
  }

  async updateCase(
    id: string,
    payload: ICase.UpdateCasePayload,
  ): Promise<ApiResponse<Case>> {
    return this.put({ route: `/api/v1/cases/${id}`, payload });
  }

  async deleteCase(id: string): Promise<ApiResponse<null>> {
    return this.delete({ route: `/api/v1/cases/${id}` });
  }

  // Findings
  async getFindingForArea(
    areaId: string,
  ): Promise<ApiResponse<ICase.ExaminationFinding>> {
    return this.get({ route: `/api/v1/cases/areas/${areaId}/finding` });
  }

  async updateFinding(
    findingId: string,
    payload: ICase.UpdateFindingPayload,
  ): Promise<ApiResponse<ICase.ExaminationFinding>> {
    return this.put({ route: `/api/v1/cases/findings/${findingId}`, payload });
  }

  // Investigations
  async addInvestigation(
    caseId: string,
    payload: ICase.AddInvestigationPayload,
  ): Promise<ApiResponse<ICase.Investigation>> {
    return this.post({
      route: `/api/v1/cases/${caseId}/investigations`,
      payload,
    });
  }

  async updateInvestigationResult(
    resultId: string,
    payload: ICase.UpdateInvestigationResultPayload,
  ): Promise<ApiResponse<ICase.InvestigationResult>> {
    return this.put({
      route: `/api/v1/cases/investigation-results/${resultId}`,
      payload,
    });
  }

  async addTableData(
    resultId: string,
    payload: ICase.AddTableDataPayload,
  ): Promise<ApiResponse<null>> {
    return this.post({
      route: `/api/v1/cases/investigation-results/${resultId}/table-data`,
      payload,
    });
  }

  // Linking media
  async linkMediaToFinding(
    findingId: string,
    mediaId: string,
  ): Promise<ApiResponse<ICase.ExaminationFinding>> {
    return this.post({
      route: `/api/v1/cases/links/finding/${findingId}/media/${mediaId}`,
    });
  }

  async linkMediaToInvestigationResult(
    resultId: string,
    mediaId: string,
  ): Promise<ApiResponse<ICase.InvestigationResult>> {
    return this.post({
      route: `/api/v1/cases/links/investigation-result/${resultId}/media/${mediaId}`,
    });
  }
}
