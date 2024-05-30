import type { Node } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type GetTokenEventDetails = {
  token: Promise<Node> | null;
};

class GetTokenEvent extends CustomEvent<GetTokenEventDetails> {
  public static type = EventIdentifier.GetToken;
  constructor() {
    super(GetTokenEvent.type, {
      ...customEventDefaultInit,
      detail: {
        token: null,
      },
    });
  }

  getToken(): Promise<Node> | null {
    return this.detail.token;
  }

  setToken(token: Promise<Node>): void {
    this.detail.token = token;
  }
}

export { GetTokenEvent, GetTokenEventDetails };
