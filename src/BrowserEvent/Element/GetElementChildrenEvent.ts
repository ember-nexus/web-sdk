import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementChildrenEventDetails = {
  uuid: Uuid;
  children: Promise<Collection> | null;
};

class GetElementChildrenEvent extends CustomEvent<GetElementChildrenEventDetails> {
  constructor(uuid: Uuid) {
    super(EventIdentifier.GetElementChildren, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        children: null,
      },
    });
  }

  getUuid(): Uuid {
    return this.detail.uuid;
  }

  getChildren(): Promise<Collection> | null {
    return this.detail.children;
  }

  setChildren(children: Promise<Collection>): void {
    this.detail.children = children;
  }
}

export { GetElementChildrenEvent, GetElementChildrenEventDetails };
