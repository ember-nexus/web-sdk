import { v4 as uuidv4 } from 'uuid';

import DeleteElementEventDetails from '../Type/DeleteElementEventDetails.js';

import Event from './index.js';

export default class DeleteElementEvent extends CustomEvent<DeleteElementEventDetails> {
  constructor(uuid: typeof uuidv4) {
    super(Event.DeleteElementEvent, {
      detail: {
        uuid: uuid,
        element: null,
      },
      bubbles: true,
      cancelable: true,
    });
  }

  setElement(element: Promise<void>): void {
    this.detail.element = element;
  }

  getElement(): Promise<void> | null {
    return this.detail.element;
  }

  getUuid(): typeof uuidv4 {
    return this.detail.uuid;
  }
}
