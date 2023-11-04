import { v4 as uuidv4 } from 'uuid';

import GetRelatedEventDetails from '../Type/GetRelatedEventDetails.js';
import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

import Event from './index.js';

export default class GetRelatedEvent extends CustomEvent<GetRelatedEventDetails> {
  constructor(uuid: typeof uuidv4) {
    super(Event.GetRelatedEvent, {
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