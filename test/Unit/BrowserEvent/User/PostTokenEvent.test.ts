import { expect } from 'chai';

import { PostTokenEvent } from '../../../../src/BrowserEvent/User';
import {
  Data,
  Token,
  createUniqueUserIdentifierFromString,
  validateTokenFromString,
} from '../../../../src/Type/Definition';

describe('PostTokenEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const postTokenEvent = new PostTokenEvent(uniqueUserIdentifier, password);

    expect(postTokenEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postTokenEvent.getPassword()).to.equal(password);
    expect(postTokenEvent.getData()).to.be.empty;
    expect(postTokenEvent.getToken()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      some: 'data',
    };
    const postTokenEvent = new PostTokenEvent(uniqueUserIdentifier, password, data);

    expect(postTokenEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postTokenEvent.getPassword()).to.equal(password);
    expect(postTokenEvent.getData().some).to.equal('data');
    expect(postTokenEvent.getToken()).to.be.null;
  });

  it('should return promise if set', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const data: Data = {
      some: 'data',
    };
    const postTokenEvent = new PostTokenEvent(uniqueUserIdentifier, password, data);

    const promise = new Promise<Token>((resolve): void => {
      resolve(validateTokenFromString('secret-token:some-token'));
    });

    postTokenEvent.setToken(promise);

    expect(postTokenEvent.getToken()).to.equal(promise);
  });
});
