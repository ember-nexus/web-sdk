import type { v4 as uuidv4 } from 'uuid';

import { Collection } from '~/Type/Definition/Collection';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementParentsEventDetails = {
  uuid: uuidv4;
  parents: Promise<Collection> | null;
};

class GetElementParentsEvent extends CustomEvent<GetElementParentsEventDetails> {
  constructor(uuid: uuidv4) {
    super(EventIdentifier.GetElementParents, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        parents: null,
      },
    });
  }

  getUuid(): uuidv4 {
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
