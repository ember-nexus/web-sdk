import { expect } from 'chai';

import { PostElementEvent } from '~/BrowserEvent/Element/PostElementEvent';
import { Uuid, validateUuidFromString } from '~/Type/Definition/Uuid';

describe('PostElementEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const parentUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc93');
    const postElementEvent = new PostElementEvent(parentUuid, 'someType');

    expect(postElementEvent.getParentId()).to.equal(parentUuid);
    expect(postElementEvent.getType()).to.equal('someType');
    expect(postElementEvent.getElementId()).to.be.null;
    expect(postElementEvent.getData()).to.be.empty;
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const parentUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc93');
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');

    const postElementEvent = new PostElementEvent(parentUuid, 'someType', elementUuid, {
      some: 'data',
    });

    expect(postElementEvent.getParentId()).to.equal(parentUuid);
    expect(postElementEvent.getType()).to.equal('someType');
    expect(postElementEvent.getElementId()).to.equal(elementUuid);
    expect(postElementEvent.getData().some).to.equal('data');
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const parentUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc93');
    const postElementEvent = new PostElementEvent(parentUuid, 'someType');

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'));
    });

    postElementEvent.setResult(promise);

    expect(postElementEvent.getResult()).to.equal(promise);
  });
});
