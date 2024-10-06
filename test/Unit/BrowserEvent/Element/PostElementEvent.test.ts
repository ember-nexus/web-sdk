import { expect } from 'chai';

import { PostElementEvent } from '../../../../src/BrowserEvent/Element';
import { NodeWithOptionalId, Uuid, validateUuidFromString } from '../../../../src/Type/Definition';

describe('PostElementEvent tests', () => {
  test('PostElementEvent returns correct type', () => {
    expect(PostElementEvent.type).to.equal('ember-nexus-sdk-post-element');
  });

  it('should set attributes to null if not explicitly defined', () => {
    const parentUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc93');
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postElementEvent = new PostElementEvent(parentUuid, node);

    expect(postElementEvent.getParentId()).to.equal(parentUuid);
    expect(postElementEvent.getElement()).to.equal(node);
    expect(postElementEvent.getElementId()).to.be.null;
  });

  it('should return promise if set', () => {
    const parentUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc93');
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postElementEvent = new PostElementEvent(parentUuid, node);

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'));
    });

    postElementEvent.setElementId(promise);

    expect(postElementEvent.getElementId()).to.equal(promise);
  });
});
