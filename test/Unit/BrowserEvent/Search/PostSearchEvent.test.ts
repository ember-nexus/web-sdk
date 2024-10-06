import { expect } from 'chai';

import { PostSearchEvent } from '../../../../src/BrowserEvent/Search';
import { Data, ElementCollection, validateUuidFromString } from '../../../../src/Type/Definition';

describe('PostSearchEvent tests', () => {
  test('PostSearchEvent returns correct type', () => {
    expect(PostSearchEvent.type).to.equal('ember-nexus-sdk-post-search');
  });

  it('should set attributes to null if not explicitly defined', () => {
    const query: Data = {
      some: 'query',
    };
    const postSearchEvent = new PostSearchEvent(query);

    expect(postSearchEvent.getQuery()).to.equal(query);
    expect(postSearchEvent.getResult()).to.equal(null);
    expect(postSearchEvent.getPage()).to.equal(1);
    expect(postSearchEvent.getPageSize()).to.be.null;
  });

  it('should return promise if set', () => {
    const query: Data = {
      some: 'query',
    };
    const postSearchEvent = new PostSearchEvent(query);

    const collection: ElementCollection = {
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      elements: [],
    };

    const promise = new Promise<ElementCollection>((resolve): void => {
      resolve(collection);
    });

    postSearchEvent.setResult(promise);

    expect(postSearchEvent.getResult()).to.equal(promise);
    expect(postSearchEvent.getPage()).to.equal(1);
    expect(postSearchEvent.getPageSize()).to.be.null;
  });

  it('should return page and page size if explicitly set', () => {
    const query: Data = {
      some: 'query',
    };
    const postSearchEvent = new PostSearchEvent(query, 3, 25);

    expect(postSearchEvent.getPage()).to.equal(3);
    expect(postSearchEvent.getPageSize()).to.equal(25);
  });
});
