import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PutElementEventDetails = {
  id: Uuid;
  data: Data;
  result: Promise<void> | null;
};

class PutElementEvent extends CustomEvent<PutElementEventDetails> {
  constructor(id: Uuid, data: Data = {}) {
    super(EventIdentifier.PutElement, {
      ...customEventDefaultInit,
      detail: {
        id: id,
        data: data,
        result: null,
      },
    });
  }

  getId(): Uuid {
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
