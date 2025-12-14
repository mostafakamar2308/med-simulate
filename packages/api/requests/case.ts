import { Base } from "@/requests/lib/base";
import { ICase } from "@med-simulate/types";

export class Case extends Base {
  async findLessons(
    params: ICase.FindCasesApiQuery
  ): Promise<ICase.FindCasesResponse> {
    return this.get({ route: "/api/v1/cases/list", params });
  }
}
