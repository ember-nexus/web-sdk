import { Data, Uuid } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type PutElementEventDetails = {
  elementId: Uuid;
  data: Data;
  result: Promise<void> | null;
};

class PutElementEvent extends CustomEvent<PutElementEventDetails> {
  public static type = EventIdentifier.PutElement;
  constructor(elementId: Uuid, data: Data = {}) {
    super(PutElementEvent.type, {
      ...customEventDefaultInit,
      detail: {
        elementId: elementId,
        data: data,
        result: null,
      },
    });
  }

  getElementId(): Uuid {
    return this.detail.elementId;
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
