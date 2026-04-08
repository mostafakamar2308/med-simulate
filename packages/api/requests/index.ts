import { createClient } from "@/requests/lib/base";
import { Case } from "@/requests/case";
import { Chat } from "@/requests/chat";
import { ChatV2 } from "@/requests/chat-v2";
import { Media } from "@/requests/media";

export class Api {
  public readonly case: Case;
  public readonly chat: Chat;
  public readonly chatV2: ChatV2;
  public readonly media: Media;

  constructor(config: {
    baseURL: string;
    getToken?: () => Promise<string | null>;
  }) {
    const client = createClient(config.baseURL, config.getToken);
    this.case = new Case(client);
    this.chat = new Chat(client);
    this.chatV2 = new ChatV2(client);
    this.media = new Media(client);
  }
}
