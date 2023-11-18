import type { Node } from '~/Type/Definition/Node';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetTokenEventDetails = {
  token: Promise<Node> | null;
};

class GetTokenEvent extends CustomEvent<GetTokenEventDetails> {
  constructor() {
    super(EventIdentifier.GetToken, {
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
