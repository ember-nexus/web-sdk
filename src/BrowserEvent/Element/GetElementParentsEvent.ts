import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementParentsEventDetails = {
  childId: Uuid;
  parents: Promise<Collection> | null;
};

class GetElementParentsEvent extends CustomEvent<GetElementParentsEventDetails> {
  constructor(childId: Uuid) {
    super(EventIdentifier.GetElementParents, {
      ...customEventDefaultInit,
      detail: {
        childId: childId,
        parents: null,
      },
    });
  }

  getChildId(): Uuid {
    return this.detail.childId;
  }

  getParents(): Promise<Collection> | null {
    return this.detail.parents;
  }

  setParents(parents: Promise<Collection>): void {
    this.detail.parents = parents;
  }
}

export { GetElementParentsEvent, GetElementParentsEventDetails };
