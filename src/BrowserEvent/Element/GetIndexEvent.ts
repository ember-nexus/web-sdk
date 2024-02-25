import { Collection } from '~/Type/Definition/Collection';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetIndexEventDetails = {
  indexElements: Promise<Collection> | null;
};

class GetIndexEvent extends CustomEvent<GetIndexEventDetails> {
  constructor() {
    super(EventIdentifier.GetIndex, {
      ...customEventDefaultInit,
      detail: {
        indexElements: null,
      },
    });
  }

  getIndexElements(): Promise<Collection> | null {
    return this.detail.indexElements;
  }

  setIndexElements(indexElements: Promise<Collection>): void {
    this.detail.indexElements = indexElements;
  }
}

export { GetIndexEvent, GetIndexEventDetails };
