import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';
import SearchEventDetails from '../Type/SearchEventDetails.js';

import Event from './index.js';

export default class SearchEvent extends CustomEvent<SearchEventDetails> {
  constructor(payload: Record<string, unknown>, page = 1) {
    super(Event.SearchEvent, {
      detail: {
        payload: payload,
        elements: null,
        page: page,
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

  getPayload(): Record<string, unknown> {
    return this.detail.payload;
  }

  getPage(): number {
    return this.detail.page;
  }
}
