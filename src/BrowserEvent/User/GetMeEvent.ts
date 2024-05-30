import type { Node } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type GetMeEventDetails = {
  me: Promise<Node> | null;
};

class GetMeEvent extends CustomEvent<GetMeEventDetails> {
  public static type = EventIdentifier.GetMe;
  constructor() {
    super(GetMeEvent.type, {
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
