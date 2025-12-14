import { Case } from "@/requests/case";
import { createClient } from "@/requests/lib/base";

export class Api {
  public readonly case: Case;

  constructor(config: {
    baseURL: string;
    getToken?: () => Promise<string | null>;
  }) {
    const client = createClient(config.baseURL, config.getToken);
    this.case = new Case(client);
  }
}
