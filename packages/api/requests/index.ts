import { Case } from "@/requests/case";
import { createClient } from "@/requests/lib/base";

export class Api {
  public readonly case: Case;

  constructor(baseURL: string) {
    const client = createClient(baseURL);
    this.case = new Case(client);
  }
}
