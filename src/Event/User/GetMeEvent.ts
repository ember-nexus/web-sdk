import type { Node } from '~/Type/Definition/Node';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetMeEventDetails = {
  me: Promise<Node> | null;
};

class GetMeEvent extends CustomEvent<GetMeEventDetails> {
  constructor() {
    super(EventIdentifier.GetMe, {
      ...customEventDefaultInit,
      detail: {
        me: null,
      },
    });
  }

  getMe(): Promise<Node> | null {
    return this.detail.me;
  }

  setMe(me: Promise<Node>): void {
    this.detail.me = me;
  }
}

export { GetMeEvent, GetMeEventDetails };
