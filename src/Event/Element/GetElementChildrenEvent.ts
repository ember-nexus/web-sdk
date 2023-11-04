import type { v4 as uuidv4 } from 'uuid';

import { Collection } from '~/Type/Definition/Collection';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementChildrenEventDetails = {
  uuid: uuidv4;
  children: Promise<Collection> | null;
};

class GetElementChildrenEvent extends CustomEvent<GetElementChildrenEventDetails> {
  constructor(uuid: uuidv4) {
    super(EventIdentifier.GetElementChildren, {
      ...customEventDefaultInit,
      detail: {
        uuid: uuid,
        children: null,
      },
    });
  }

  getUuid(): uuidv4 {
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
