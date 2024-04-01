import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PatchElementEventDetails = {
  elementId: Uuid;
  data: Data;
  result: Promise<void> | null;
};

class PatchElementEvent extends CustomEvent<PatchElementEventDetails> {
  constructor(elementId: Uuid, data: Data = {}) {
    super(EventIdentifier.PatchElement, {
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

  setResult(result: Promise<void> | null): PatchElementEvent {
    this.detail.result = result;
    return this;
  }
}

export { PatchElementEvent, PatchElementEventDetails };
