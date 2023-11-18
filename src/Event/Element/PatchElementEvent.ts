import type { v4 as uuidv4 } from 'uuid';

import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PatchElementEventDetails = {
  id: uuidv4;
  data: Data;
  result: Promise<void> | null;
};

class PatchElementEvent extends CustomEvent<PatchElementEventDetails> {
  constructor(id: uuidv4, data: Data = {}) {
    super(EventIdentifier.PatchElement, {
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

  setResult(result: Promise<void> | null): PatchElementEvent {
    this.detail.result = result;
    return this;
  }
}

export { PatchElementEvent, PatchElementEventDetails };
