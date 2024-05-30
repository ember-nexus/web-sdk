import { Collection } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type GetIndexEventDetails = {
  page: number;
  pageSize: number | null;
  indexElements: Promise<Collection> | null;
};

class GetIndexEvent extends CustomEvent<GetIndexEventDetails> {
  public static type = EventIdentifier.GetIndex;
  constructor(page = 1, pageSize: number | null = null) {
    super(GetIndexEvent.type, {
      ...customEventDefaultInit,
      detail: {
        page: page,
        pageSize: pageSize,
        indexElements: null,
      },
    });
  }

  getPage(): number {
    return this.detail.page;
  }

  getPageSize(): number | null {
    return this.detail.pageSize;
  }

  getIndexElements(): Promise<Collection> | null {
    return this.detail.indexElements;
  }

  setIndexElements(indexElements: Promise<Collection>): void {
    this.detail.indexElements = indexElements;
  }
}

export { GetIndexEvent, GetIndexEventDetails };
