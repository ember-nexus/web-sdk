import { v4 as uuidv4 } from 'uuid';

import GetElementEventDetails from '../Type/GetElementEventDetails.js';
import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

import Event from './index.js';

export default class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  constructor(uuid: typeof uuidv4) {
    super(Event.GetElementEvent, {
      detail: {
        uuid: uuid,
        element: null,
      },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
  }

  setElement(element: Promise<Node | Relation>): void {
    this.detail.element = element;
  }

  getElement(): Promise<Node | Relation> | null {
    return this.detail.element;
  }

  getUuid(): typeof uuidv4 {
    return this.detail.uuid;
  }
}
