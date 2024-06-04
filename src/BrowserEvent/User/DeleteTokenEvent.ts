import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type DeleteTokenEventDetails = {
  result: Promise<void> | null;
};

class DeleteTokenEvent extends CustomEvent<DeleteTokenEventDetails> {
  public static type = EventIdentifier.DeleteToken;
  constructor() {
    super(DeleteTokenEvent.type, {
      ...customEventDefaultInit,
      detail: {
        result: null,
      },
    });
  }

  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  setResult(result: Promise<void> | null): DeleteTokenEvent {
    this.detail.result = result;
    return this;
  }
}

export { DeleteTokenEvent, DeleteTokenEventDetails };
