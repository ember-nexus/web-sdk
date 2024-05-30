import { Data, ElementCollection } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostSearchEventDetails = {
  query: Data;
  page: number;
  pageSize: number | null;
  result: Promise<ElementCollection> | null;
};

class PostSearchEvent extends CustomEvent<PostSearchEventDetails> {
  public static type = EventIdentifier.PostSearch;
  constructor(query: Data, page = 1, pageSize: number | null = null) {
    super(EventIdentifier.PostSearch, {
      ...customEventDefaultInit,
      detail: {
        query: query,
        page: page,
        pageSize: pageSize,
        result: null,
      },
    });
  }

  getQuery(): Data {
    return this.detail.query;
  }

  getPage(): number {
    return this.detail.page;
  }

  getPageSize(): number | null {
    return this.detail.pageSize;
  }

  getResult(): Promise<ElementCollection> | null {
    return this.detail.result;
  }

  setResult(result: Promise<ElementCollection> | null): PostSearchEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostSearchEvent, PostSearchEventDetails };
