import { expect } from 'chai';

import { PostIndexEvent } from '~/BrowserEvent/Element/PostIndexEvent';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { Uuid, validateUuidFromString } from '~/Type/Definition/Uuid';

describe('PostIndexEvent tests', () => {
  test('PostIndexEvent returns correct type', () => {
    expect(PostIndexEvent.type).to.equal('ember-nexus-post-index');
  });

  it('should set attributes to null if not explicitly defined', async () => {
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postIndexEvent = new PostIndexEvent(node);

    expect(postIndexEvent.getElement()).to.equal(node);
    expect(postIndexEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const node: NodeWithOptionalId = {
      type: 'someType',
      data: {},
    };
    const postIndexEvent = new PostIndexEvent(node);

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'));
    });

    postIndexEvent.setResult(promise);

    expect(postIndexEvent.getResult()).to.equal(promise);
  });
});
