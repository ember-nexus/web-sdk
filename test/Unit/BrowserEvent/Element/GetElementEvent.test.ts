import { expect } from 'chai';

import { GetElementEvent } from '~/BrowserEvent/Element/GetElementEvent';
import type { Node } from '~/Type/Definition/Node';
import type { Relation } from '~/Type/Definition/Relation';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementEvent tests', () => {
  test('GetElementEvent returns correct type', () => {
    expect(GetElementEvent.type).to.equal('ember-nexus-get-element');
  });

  it('should return null when no element was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementEvent = new GetElementEvent(uuid);

    expect(getElementEvent.getElementId()).to.equal(uuid);
    expect(getElementEvent.getElement()).to.be.null;
  });

  it('should return promise when node was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementEvent = new GetElementEvent(uuid);

    const node: Node = {
      type: 'someType',
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
      data: {
        some: 'data',
      },
    };

    const promise = new Promise<Node>((resolve): void => {
      resolve(node);
    });

    getElementEvent.setElement(promise);

    expect(getElementEvent.getElementId()).to.equal(uuid);
    expect(getElementEvent.getElement()).to.equal(promise);
  });

  it('should return promise when relation was set', async () => {
    const uuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const getElementEvent = new GetElementEvent(uuid);

    const relation: Relation = {
      type: 'someType',
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
      start: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'),
      end: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc96'),
      data: {
        some: 'data',
      },
    };

    const promise = new Promise<Relation>((resolve): void => {
      resolve(relation);
    });

    getElementEvent.setElement(promise);

    expect(getElementEvent.getElementId()).to.equal(uuid);
    expect(getElementEvent.getElement()).to.equal(promise);
  });
});
