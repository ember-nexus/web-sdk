import { v4 as uuidv4 } from 'uuid';

import GetChildrenEventDetails from '../Type/GetChildrenEventDetails.js';
import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

import Event from './index.js';

export default class GetChildrenEvent extends CustomEvent<GetChildrenEventDetails> {
  constructor(uuid: typeof uuidv4) {
    super(Event.GetElementEvent, {
      detail: {
        uuid: uuid,
        elements: null,
      },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
  }

  setElements(elements: Promise<Array<Node | Relation>>): void {
    this.detail.elements = elements;
  }

  getElements(): Promise<Array<Node | Relation>> | null {
    return this.detail.elements;
  }

  getUuid(): typeof uuidv4 {
    return this.detail.uuid;
  }
}
