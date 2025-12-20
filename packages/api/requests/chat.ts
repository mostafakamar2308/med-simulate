import { Base } from "@/requests/lib/base";
import { IChat } from "@med-simulate/types";

export class Chat extends Base {
  async sendMessage({
    chat,
    caseId,
  }: {
    chat: IChat.Message[];
    caseId: string;
  }): Promise<IChat.SendMessageResponse> {
    return this.post({ route: "/api/v1/chat", payload: { chat, caseId } });
  }
}
