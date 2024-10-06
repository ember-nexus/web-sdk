import { expect } from 'chai';

import { PostRegisterEvent } from '../../../../src/BrowserEvent/User';
import {
  Data,
  Uuid,
  createUniqueUserIdentifierFromString,
  validateUuidFromString,
} from '../../../../src/Type/Definition';

describe('PostRegisterEvent tests', () => {
  it('should set attributes to null if not explicitly defined', () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password);

    expect(postRegisterEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postRegisterEvent.getPassword()).to.equal(password);
    expect(postRegisterEvent.getData()).to.be.empty;
    expect(postRegisterEvent.getUserId()).to.be.null;
  });

  it('should return attributes if explicitly defined', () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password, data);

    expect(postRegisterEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postRegisterEvent.getPassword()).to.equal(password);
    expect(postRegisterEvent.getData().email).to.equal('user@localhost.dev');
    expect(postRegisterEvent.getUserId()).to.be.null;
  });

  it('should return promise if set', () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postRegisterEvent = new PostRegisterEvent(uniqueUserIdentifier, password, data);

    const promise = new Promise<Uuid>((resolve): void => {
      resolve(validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'));
    });

    postRegisterEvent.setUserId(promise);

    expect(postRegisterEvent.getUserId()).to.equal(promise);
  });
});
