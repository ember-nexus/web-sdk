import type { v4 as uuidv4 } from 'uuid';

import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PutElementEventDetails = {
  id: uuidv4;
  data: Data;
  result: Promise<void> | null;
};

class PutElementEvent extends CustomEvent<PutElementEventDetails> {
  constructor(id: uuidv4, data: Data = {}) {
    super(EventIdentifier.PutElement, {
      ...customEventDefaultInit,
      detail: {
        id: id,
        data: data,
        result: null,
      },
    });
  }

  getId(): uuidv4 {
    return this.detail.id;
  }

  getData(): Data {
    return this.detail.data;
  }

  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  setResult(result: Promise<void> | null): PutElementEvent {
    this.detail.result = result;
    return this;
  }
}

export { PutElementEvent, PutElementEventDetails };
