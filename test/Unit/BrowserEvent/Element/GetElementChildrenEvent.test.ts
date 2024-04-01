import { expect } from 'chai';

import { GetElementChildrenEvent } from '~/BrowserEvent/Element/GetElementChildrenEvent';
import { Collection } from '~/Type/Definition/Collection';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementChildrenEvent tests', () => {
  it('should return null when no element was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementChildrenEvent = new GetElementChildrenEvent(uuid);

    expect(getElementChildrenEvent.getParentId()).to.equal(uuid);
    expect(getElementChildrenEvent.getChildren()).to.be.null;
  });

  it('should return promise when collection was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementChildrenEvent = new GetElementChildrenEvent(uuid);

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

    getElementChildrenEvent.setChildren(promise);

    expect(getElementChildrenEvent.getParentId()).to.equal(uuid);
    expect(getElementChildrenEvent.getChildren()).to.equal(promise);
  });
});
