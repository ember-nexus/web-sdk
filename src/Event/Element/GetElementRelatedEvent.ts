import type { v4 as uuidv4 } from 'uuid';

import { Collection } from '~/Type/Definition/Collection';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementRelatedEventDetails = {
  uuid: uuidv4;
  related: Promise<Collection> | null;
};

class GetElementRelatedEvent extends CustomEvent<GetElementRelatedEventDetails> {
  constructor(uuid: uuidv4) {
    super(EventIdentifier.GetElementRelated, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        related: null,
      },
    });
  }

  getUuid(): uuidv4 {
    return this.detail.uuid;
  }

  getRelated(): Promise<Collection> | null {
    return this.detail.related;
  }

  setRelated(related: Promise<Collection>): void {
    this.detail.related = related;
  }
}

export { GetElementRelatedEvent, GetElementRelatedEventDetails };
