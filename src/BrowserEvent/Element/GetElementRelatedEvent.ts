import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementRelatedEventDetails = {
  uuid: Uuid;
  related: Promise<Collection> | null;
};

class GetElementRelatedEvent extends CustomEvent<GetElementRelatedEventDetails> {
  constructor(uuid: Uuid) {
    super(EventIdentifier.GetElementRelated, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        related: null,
      },
    });
  }

  getUuid(): Uuid {
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
