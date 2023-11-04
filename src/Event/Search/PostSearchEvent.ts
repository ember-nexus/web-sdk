import { Data } from '~/Type/Definition/Data';
import { ElementCollection } from '~/Type/Definition/ElementCollection';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostSearchEventDetails = {
  query: Data;
  result: Promise<ElementCollection> | null;
};

class PostSearchEvent extends CustomEvent<PostSearchEventDetails> {
  constructor(query: Data = {}) {
    super(EventIdentifier.PostSearch, {
      ...customEventDefaultInit,
      detail: {
        query: query,
        result: null,
      },
    });
  }

  getQuery(): Data {
    return this.detail.query;
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
