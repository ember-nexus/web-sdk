import type { Node } from '~/Type/Definition/Node';
import type { Relation } from '~/Type/Definition/Relation';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementEventDetails = {
  uuid: Uuid;
  element: Promise<Node | Relation> | null;
};

class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  constructor(uuid: Uuid) {
    super(EventIdentifier.GetElement, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        element: null,
      },
    });
  }

  getUuid(): Uuid {
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
