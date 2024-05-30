import { Data, Uuid } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PatchElementEventDetails = {
  elementId: Uuid;
  data: Data;
  result: Promise<void> | null;
};

class PatchElementEvent extends CustomEvent<PatchElementEventDetails> {
  public static type = EventIdentifier.PatchElement;
  constructor(elementId: Uuid, data: Data = {}) {
    super(PatchElementEvent.type, {
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
