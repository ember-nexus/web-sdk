import type { v4 as uuidv4 } from 'uuid';

import type {Node} from '../../Type/Definition/Node.js';
import type {Relation} from '../../Type/Definition/Relation.js';
import {EventIdentifier} from '../../Type/Enum/EventIdentifierEnum.js';
import {customEventDefaultInit} from "../../Type/Partial/CustomEventDefaultInit.js";

type GetElementEventDetails = {
  uuid: typeof uuidv4;
  element: Promise<Node | Relation> | null;
};

class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  constructor(uuid: typeof uuidv4) {
    super(EventIdentifier.GetElement, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        element: null,
      },
    });
  }

  setElement(element: Promise<Node | Relation>): void {
    this.detail.element = element;
  }

  getElement(): Promise<Node | Relation> | null {
    return this.detail.element;
  }

  getUuid(): uuidv4 {
    return this.detail.uuid;
  }
}

export {GetElementEvent, GetElementEventDetails};
