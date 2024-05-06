import { Collection } from '~/Type/Definition/Collection';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

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
