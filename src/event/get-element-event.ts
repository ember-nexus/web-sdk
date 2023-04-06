import { v4 as uuidv4 } from 'uuid';

import GetElementEventDetails from '../type/get-element-event-details.js';
import Node from '../type/node.js';
import Relation from '../type/relation.js';

import Event from './index.js';

export default class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  constructor(uuid: typeof uuidv4, cacheOnly = false) {
    super(Event.GetElementEvent, {
      detail: {
        uuid: uuid,
        cacheOnly: cacheOnly,
        element: null,
      },
      bubbles: true,
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

  getCacheOnly(): boolean {
    return this.detail.cacheOnly;
  }
}
