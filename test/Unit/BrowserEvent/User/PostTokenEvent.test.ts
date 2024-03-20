import { expect } from 'chai';

import { PostTokenEvent } from '~/BrowserEvent/User/PostTokenEvent';
import { Data } from '~/Type/Definition/Data';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';

describe('PostTokenEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const user = 'user@localhost.dev';
    const password = '1234';
    const postTokenEvent = new PostTokenEvent(user, password);

    expect(postTokenEvent.getUser()).to.equal(user);
    expect(postTokenEvent.getPassword()).to.equal(password);
    expect(postTokenEvent.getData()).to.be.empty;
    expect(postTokenEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const user = 'user@localhost.dev';
    const password = '1234';
    const data: Data = {
      some: 'data',
    };
    const postTokenEvent = new PostTokenEvent(user, password, data);

    expect(postTokenEvent.getUser()).to.equal(user);
    expect(postTokenEvent.getPassword()).to.equal(password);
    expect(postTokenEvent.getData().some).to.equal('data');
    expect(postTokenEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const user = 'user@localhost.dev';
    const password = '1234';
    const data: Data = {
      some: 'data',
    };
    const postTokenEvent = new PostTokenEvent(user, password, data);

    const promise = new Promise<Token>((resolve): void => {
      resolve(validateTokenFromString('secret-token:some-token'));
    });

    postTokenEvent.setResult(promise);

    expect(postTokenEvent.getResult()).to.equal(promise);
  });
});
