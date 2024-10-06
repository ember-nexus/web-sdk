import { expect } from 'chai';

import { PostIndexEvent } from '../../../../src/BrowserEvent/Element';
import { NodeWithOptionalId, Uuid, validateUuidFromString } from '../../../../src/Type/Definition';

describe('PostIndexEvent tests', () => {
  test('PostIndexEvent returns correct type', () => {
    expect(PostIndexEvent.type).to.equal('ember-nexus-sdk-post-index');
  });

  it('should set attributes to null if not explicitly defined', () => {
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postIndexEvent = new PostIndexEvent(node);

    expect(postIndexEvent.getElement()).to.equal(node);
    expect(postIndexEvent.getElementId()).to.be.null;
  });

  it('should return promise if set', () => {
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postIndexEvent = new PostIndexEvent(node);

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'));
    });

    postIndexEvent.setElementId(promise);

    expect(postIndexEvent.getElementId()).to.equal(promise);
  });
});
