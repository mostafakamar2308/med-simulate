import { Base } from "@/requests/lib/base";
import { ICase } from "@med-simulate/types";

export class Case extends Base {
  async findCases(
    params: ICase.FindCasesApiQuery,
  ): Promise<ICase.FindCasesResponse> {
    return this.get({ route: "/api/v1/cases/list", params });
  }

  async findCaseById({ id }: { id: string }): Promise<ICase.FullCase | null> {
    return this.get({ route: `/api/v1/cases/${id}` });
  }
}
