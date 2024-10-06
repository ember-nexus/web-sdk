import { expect } from 'chai';

import { GetIndexEvent } from '../../../../src/BrowserEvent/Element';
import { Collection } from '../../../../src/Type/Definition';

describe('GetIndexEvent tests', () => {
  test('GetIndexEvent returns correct type', () => {
    expect(GetIndexEvent.type).to.equal('ember-nexus-sdk-get-index');
  });

  it('should return null when no element was set', () => {
    const getIndexEvent = new GetIndexEvent();

    expect(getIndexEvent.getIndexCollection()).to.be.null;
    expect(getIndexEvent.getPage()).to.equal(1);
    expect(getIndexEvent.getPageSize()).to.be.null;
  });

  it('should return promise when collection was set', () => {
    const getIndexEvent = new GetIndexEvent();

    const collection: Collection = {
      id: '/',
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      nodes: [],
      relations: [],
    };

    const promise = new Promise<Collection>((resolve): void => {
      resolve(collection);
    });

    getIndexEvent.setIndexCollection(promise);

    expect(getIndexEvent.getIndexCollection()).to.equal(promise);
    expect(getIndexEvent.getPage()).to.equal(1);
    expect(getIndexEvent.getPageSize()).to.be.null;
  });

  it('should return page and page size if explicitly set', () => {
    const getIndexEvent = new GetIndexEvent(3, 25);

    expect(getIndexEvent.getPage()).to.equal(3);
    expect(getIndexEvent.getPageSize()).to.equal(25);
  });
});
