import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementRelatedEventDetails = {
  centerId: Uuid;
  related: Promise<Collection> | null;
};

class GetElementRelatedEvent extends CustomEvent<GetElementRelatedEventDetails> {
  constructor(centerId: Uuid) {
    super(EventIdentifier.GetElementRelated, {
      ...customEventDefaultInit,
      detail: {
        centerId: centerId,
        related: null,
      },
    });
  }

  getCenterId(): Uuid {
    return this.detail.centerId;
  }

  getRelated(): Promise<Collection> | null {
    return this.detail.related;
  }

  setRelated(related: Promise<Collection>): void {
    this.detail.related = related;
  }
}

export { GetElementRelatedEvent, GetElementRelatedEventDetails };
