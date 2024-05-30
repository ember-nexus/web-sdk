import { expect } from 'chai';

import { PostTokenEvent } from '../../../../src/BrowserEvent/User';
import { Data } from '../../../../src/Type/Definition';
import { Token, validateTokenFromString } from '../../../../src/Type/Definition';
import { createUniqueUserIdentifierFromString } from '../../../../src/Type/Definition';

describe('PostTokenEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const password = '1234';
    const postTokenEvent = new PostTokenEvent(uniqueUserIdentifier, password);

    expect(postTokenEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postTokenEvent.getPassword()).to.equal(password);
    expect(postTokenEvent.getData()).to.be.empty;
    expect(postTokenEvent.getResult()).to.be.null;
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
    expect(postTokenEvent.getResult()).to.be.null;
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

    postTokenEvent.setResult(promise);

    expect(postTokenEvent.getResult()).to.equal(promise);
  });
});
