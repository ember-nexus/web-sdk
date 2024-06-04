import type { Node } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

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
