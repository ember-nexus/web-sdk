import { Uuid } from '../../Type/Definition';
import { Collection } from '../../Type/Definition/Collection';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type GetElementChildrenEventDetails = {
  parentId: Uuid;
  page: number;
  pageSize: number | null;
  children: Promise<Collection> | null;
};

class GetElementChildrenEvent extends CustomEvent<GetElementChildrenEventDetails> {
  public static type = EventIdentifier.GetElementChildren;
  constructor(parentId: Uuid, page = 1, pageSize: number | null = null) {
    super(GetElementChildrenEvent.type, {
      ...customEventDefaultInit,
      detail: {
        parentId: parentId,
        page: page,
        pageSize: pageSize,
        children: null,
      },
    });
  }

  getParentId(): Uuid {
    return this.detail.parentId;
  }

  getPage(): number {
    return this.detail.page;
  }

  getPageSize(): number | null {
    return this.detail.pageSize;
  }

  getChildren(): Promise<Collection> | null {
    return this.detail.children;
  }

  setChildren(children: Promise<Collection>): void {
    this.detail.children = children;
  }
}

export { GetElementChildrenEvent, GetElementChildrenEventDetails };
