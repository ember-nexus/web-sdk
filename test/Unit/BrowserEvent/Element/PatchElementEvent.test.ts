import { expect } from 'chai';

import { PatchElementEvent } from '~/BrowserEvent/Element/PatchElementEvent';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('PatchElementEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const postElementEvent = new PatchElementEvent(elementUuid);

    expect(postElementEvent.getElementId()).to.equal(elementUuid);
    expect(postElementEvent.getData()).to.be.empty;
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');

    const postElementEvent = new PatchElementEvent(elementUuid, {
      some: 'data',
    });

    expect(postElementEvent.getElementId()).to.equal(elementUuid);
    expect(postElementEvent.getData().some).to.equal('data');
    expect(postElementEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const elementUuid = validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94');
    const postElementEvent = new PatchElementEvent(elementUuid);

    const promise = new Promise<void>((resolve): void => {
      resolve();
    });

    postElementEvent.setResult(promise);

    expect(postElementEvent.getResult()).to.equal(promise);
  });
});
