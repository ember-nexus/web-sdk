import type { v4 as uuidv4 } from 'uuid';

import type { Node } from '~/Type/Definition/Node';
import type { Relation } from '~/Type/Definition/Relation';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementEventDetails = {
  uuid: uuidv4;
  element: Promise<Node | Relation> | null;
};

class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  constructor(uuid: uuidv4) {
    super(EventIdentifier.GetElement, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        element: null,
      },
    });
  }

  getUuid(): uuidv4 {
    return this.detail.uuid;
  }

  getElement(): Promise<Node | Relation> | null {
    return this.detail.element;
  }

  setElement(element: Promise<Node | Relation>): void {
    this.detail.element = element;
  }
}

export { GetElementEvent, GetElementEventDetails };
