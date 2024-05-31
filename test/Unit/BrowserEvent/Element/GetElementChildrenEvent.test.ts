import { expect } from 'chai';

import { GetElementChildrenEvent } from '../../../../src/BrowserEvent/Element';
import { Collection } from '../../../../src/Type/Definition';
import { validateUuidFromString } from '../../../../src/Type/Definition';

describe('GetElementChildrenEvent tests', () => {
  test('GetElementChildrenEvent returns correct type', () => {
    expect(GetElementChildrenEvent.type).to.equal('ember-nexus-get-element-children');
  });

  it('should return null when no element was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementChildrenEvent = new GetElementChildrenEvent(uuid);

    expect(getElementChildrenEvent.getParentId()).to.equal(uuid);
    expect(getElementChildrenEvent.getChildren()).to.be.null;
    expect(getElementChildrenEvent.getPage()).to.equal(1);
    expect(getElementChildrenEvent.getPageSize()).to.be.null;
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
    expect(getElementChildrenEvent.getPage()).to.equal(1);
    expect(getElementChildrenEvent.getPageSize()).to.be.null;
  });

  it('should return page and page size if explicitly set', () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementChildrenEvent = new GetElementChildrenEvent(uuid, 3, 25);

    expect(getElementChildrenEvent.getPage()).to.equal(3);
    expect(getElementChildrenEvent.getPageSize()).to.equal(25);
  });
});
