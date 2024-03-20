import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type DeleteElementEventDetails = {
  uuid: Uuid;
  result: Promise<void> | null;
};

class DeleteElementEvent extends CustomEvent<DeleteElementEventDetails> {
  constructor(uuid: Uuid) {
    super(EventIdentifier.DeleteElement, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        result: null,
      },
    });
  }

  getUuid(): Uuid {
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
