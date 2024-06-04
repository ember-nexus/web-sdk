import { Collection, Uuid } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type GetElementParentsEventDetails = {
  childId: Uuid;
  page: number;
  pageSize: number | null;
  parents: Promise<Collection> | null;
};

class GetElementParentsEvent extends CustomEvent<GetElementParentsEventDetails> {
  public static type = EventIdentifier.GetElementParents;
  constructor(childId: Uuid, page = 1, pageSize: number | null = null) {
    super(GetElementParentsEvent.type, {
      ...customEventDefaultInit,
      detail: {
        childId: childId,
        page: page,
        pageSize: pageSize,
        parents: null,
      },
    });
  }

  getChildId(): Uuid {
    return this.detail.childId;
  }

  getPage(): number {
    return this.detail.page;
  }

  getPageSize(): number | null {
    return this.detail.pageSize;
  }

  getParents(): Promise<Collection> | null {
    return this.detail.parents;
  }

  setParents(parents: Promise<Collection>): void {
    this.detail.parents = parents;
  }
}

export { GetElementParentsEvent, GetElementParentsEventDetails };
