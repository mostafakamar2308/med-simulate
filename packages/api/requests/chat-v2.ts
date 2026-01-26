import { Base } from "@/requests/lib/base";
import { IChat } from "@med-simulate/types";

export class ChatV2 extends Base {
  async sendMessageStream({
    chat,
    caseId,
  }: {
    chat: IChat.Message[];
    caseId: string;
  }): Promise<ReadableStream<Uint8Array>> {
    return this.stream({ route: "/api/v1/chat-v2", payload: { chat, caseId } });
  }
}
