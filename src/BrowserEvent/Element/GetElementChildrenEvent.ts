import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementChildrenEventDetails = {
  parentId: Uuid;
  children: Promise<Collection> | null;
};

class GetElementChildrenEvent extends CustomEvent<GetElementChildrenEventDetails> {
  constructor(parentId: Uuid) {
    super(EventIdentifier.GetElementChildren, {
      ...customEventDefaultInit,
      detail: {
        parentId: parentId,
        children: null,
      },
    });
  }

  getParentId(): Uuid {
    return this.detail.parentId;
  }

  getChildren(): Promise<Collection> | null {
    return this.detail.children;
  }

  setChildren(children: Promise<Collection>): void {
    this.detail.children = children;
  }
}

export { GetElementChildrenEvent, GetElementChildrenEventDetails };
