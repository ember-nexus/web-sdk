import { expect } from 'chai';

import { PostRegisterEvent } from '../../../../src/BrowserEvent/User';
import { Data } from '../../../../src/Type/Definition';
import { createUniqueUserIdentifierFromString } from '../../../../src/Type/Definition';
import { Uuid, validateUuidFromString } from '../../../../src/Type/Definition';

describe('PostRegisterEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password);

    expect(postRegisterEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postRegisterEvent.getPassword()).to.equal(password);
    expect(postRegisterEvent.getData()).to.be.empty;
    expect(postRegisterEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password, data);

    expect(postRegisterEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postRegisterEvent.getPassword()).to.equal(password);
    expect(postRegisterEvent.getData().email).to.equal('user@localhost.dev');
    expect(postRegisterEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password, data);

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'));
    });

    postRegisterEvent.setResult(promise);

    expect(postRegisterEvent.getResult()).to.equal(promise);
  });
});
