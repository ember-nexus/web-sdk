import { expect } from 'chai';

import { GetElementParentsEvent } from '~/BrowserEvent/Element/GetElementParentsEvent';
import { Collection } from '~/Type/Definition/Collection';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementParentsEvent tests', () => {
  it('should return null when no element was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementParentsEvent = new GetElementParentsEvent(uuid);

    expect(getElementParentsEvent.getChildId()).to.equal(uuid);
    expect(getElementParentsEvent.getParents()).to.be.null;
  });

  it('should return promise when collection was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementParentsEvent = new GetElementParentsEvent(uuid);

    const collection: Collection = {
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
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

    getElementParentsEvent.setParents(promise);

    expect(getElementParentsEvent.getChildId()).to.equal(uuid);
    expect(getElementParentsEvent.getParents()).to.equal(promise);
  });
});
