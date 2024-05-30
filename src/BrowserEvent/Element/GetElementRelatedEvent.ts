import { Collection, Uuid } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type GetElementRelatedEventDetails = {
  centerId: Uuid;
  page: number;
  pageSize: number | null;
  related: Promise<Collection> | null;
};

class GetElementRelatedEvent extends CustomEvent<GetElementRelatedEventDetails> {
  public static type = EventIdentifier.GetElementRelated;
  constructor(centerId: Uuid, page = 1, pageSize: number | null = null) {
    super(GetElementRelatedEvent.type, {
      ...customEventDefaultInit,
      detail: {
        centerId: centerId,
        page: page,
        pageSize: pageSize,
        related: null,
      },
    });
  }

  getCenterId(): Uuid {
    return this.detail.centerId;
  }

  getPage(): number {
    return this.detail.page;
  }

  getPageSize(): number | null {
    return this.detail.pageSize;
  }

  getRelated(): Promise<Collection> | null {
    return this.detail.related;
  }

  setRelated(related: Promise<Collection>): void {
    this.detail.related = related;
  }
}

export { GetElementRelatedEvent, GetElementRelatedEventDetails };
