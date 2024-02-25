import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementParentsEventDetails = {
  uuid: Uuid;
  parents: Promise<Collection> | null;
};

class GetElementParentsEvent extends CustomEvent<GetElementParentsEventDetails> {
  constructor(uuid: Uuid) {
    super(EventIdentifier.GetElementParents, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        parents: null,
      },
    });
  }

  getUuid(): Uuid {
    return this.detail.uuid;
  }

  getParents(): Promise<Collection> | null {
    return this.detail.parents;
  }

  setParents(parents: Promise<Collection>): void {
    this.detail.parents = parents;
  }
}

export { GetElementParentsEvent, GetElementParentsEventDetails };
