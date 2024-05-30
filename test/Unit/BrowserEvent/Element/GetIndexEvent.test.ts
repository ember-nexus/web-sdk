import { expect } from 'chai';

import { GetIndexEvent } from '../../../../src/BrowserEvent/Element';
import { Collection } from '../../../../src/Type/Definition';

describe('GetIndexEvent tests', () => {
  test('GetIndexEvent returns correct type', () => {
    expect(GetIndexEvent.type).to.equal('ember-nexus-get-index');
  });

  it('should return null when no element was set', async () => {
    const getIndexEvent = new GetIndexEvent();

    expect(getIndexEvent.getIndexElements()).to.be.null;
  });

  it('should return promise when collection was set', async () => {
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

    getIndexEvent.setIndexElements(promise);

    expect(getIndexEvent.getIndexElements()).to.equal(promise);
  });
});
