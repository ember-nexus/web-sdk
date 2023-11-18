import type { v4 as uuidv4 } from 'uuid';

import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type DeleteElementEventDetails = {
  uuid: uuidv4;
  result: Promise<void> | null;
};

class DeleteElementEvent extends CustomEvent<DeleteElementEventDetails> {
  constructor(uuid: uuidv4) {
    super(EventIdentifier.DeleteElement, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        result: null,
      },
    });
  }

  getUuid(): uuidv4 {
    return this.detail.uuid;
  }

  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  setResult(result: Promise<void>): void {
    this.detail.result = result;
  }
}

export { DeleteElementEvent, DeleteElementEventDetails };
