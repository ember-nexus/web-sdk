import { expect } from 'chai';

import { PutElementEvent } from '../../../../src/BrowserEvent/Element';
import { validateUuidFromString } from '../../../../src/Type/Definition';

describe('PutElementEvent tests', () => {
  test('PutElementEvent returns correct type', () => {
    expect(PutElementEvent.type).to.equal('ember-nexus-sdk-put-element');
  });

  it('should set attributes to null if not explicitly defined', () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const postElementEvent = new PutElementEvent(elementUuid);

    expect(postElementEvent.getElementId()).to.equal(elementUuid);
    expect(postElementEvent.getData()).to.be.empty;
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');

    const postElementEvent = new PutElementEvent(elementUuid, {
      some: 'data',
    });

    expect(postElementEvent.getElementId()).to.equal(elementUuid);
    expect(postElementEvent.getData().some).to.equal('data');
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return promise if set', () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const postElementEvent = new PutElementEvent(elementUuid);

    const promise = new Promise<void>((resolve): void => {
      resolve();
    });

    postElementEvent.setResult(promise);

    expect(postElementEvent.getResult()).to.equal(promise);
  });
});
