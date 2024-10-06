import { expect } from 'chai';

import { GetElementParentsEvent } from '../../../../src/BrowserEvent/Element';
import { Collection, validateUuidFromString } from '../../../../src/Type/Definition';

describe('GetElementParentsEvent tests', () => {
  test('GetElementParentsEvent returns correct type', () => {
    expect(GetElementParentsEvent.type).to.equal('ember-nexus-sdk-get-element-parents');
  });

  it('should return null when no element was set', () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementParentsEvent = new GetElementParentsEvent(uuid);

    expect(getElementParentsEvent.getChildId()).to.equal(uuid);
    expect(getElementParentsEvent.getParents()).to.be.null;
    expect(getElementParentsEvent.getPage()).to.equal(1);
    expect(getElementParentsEvent.getPageSize()).to.be.null;
  });

  it('should return promise when collection was set', () => {
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
    expect(getElementParentsEvent.getPage()).to.equal(1);
    expect(getElementParentsEvent.getPageSize()).to.be.null;
  });

  it('should return page and page size if explicitly set', () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementParentsEvent = new GetElementParentsEvent(uuid, 3, 25);

    expect(getElementParentsEvent.getPage()).to.equal(3);
    expect(getElementParentsEvent.getPageSize()).to.equal(25);
  });
});
