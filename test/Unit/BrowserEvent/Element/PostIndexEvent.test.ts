import { expect } from 'chai';

import { PostIndexEvent } from '~/BrowserEvent/Element/PostIndexEvent';
import { Uuid, validateUuidFromString } from '~/Type/Definition/Uuid';

describe('PostIndexEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const postIndexEvent = new PostIndexEvent('someType');

    expect(postIndexEvent.getType()).to.equal('someType');
    expect(postIndexEvent.getId()).to.be.null;
    expect(postIndexEvent.getStart()).to.be.null;
    expect(postIndexEvent.getEnd()).to.be.null;
    expect(postIndexEvent.getData()).to.be.empty;
    expect(postIndexEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const startUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95');
    const endUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc96');

    const postIndexEvent = new PostIndexEvent('someType', elementUuid, startUuid, endUuid, {
      some: 'data',
    });

    expect(postIndexEvent.getType()).to.equal('someType');
    expect(postIndexEvent.getId()).to.equal(elementUuid);
    expect(postIndexEvent.getStart()).to.equal(startUuid);
    expect(postIndexEvent.getEnd()).to.equal(endUuid);
    expect(postIndexEvent.getData().some).to.equal('data');
    expect(postIndexEvent.getResult()).to.be.null;
  });

  it('should throw error if only start is defined', async () => {
    const startUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95');

    expect(() => {
      new PostIndexEvent('someType', null, startUuid);
    }).to.throw('When creating relations, both start and end must be defined.');
  });

  it('should throw error if only end is defined', async () => {
    const endUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95');

    expect(() => {
      new PostIndexEvent('someType', null, null, endUuid);
    }).to.throw('When creating relations, both start and end must be defined.');
  });

  it('should return promise if set', async () => {
    const postIndexEvent = new PostIndexEvent('someType');

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc95'));
    });

    postIndexEvent.setResult(promise);

    expect(postIndexEvent.getResult()).to.equal(promise);
  });
});
