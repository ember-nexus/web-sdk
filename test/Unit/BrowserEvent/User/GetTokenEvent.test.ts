import { expect } from 'chai';

import { GetTokenEvent } from '~/BrowserEvent/User/GetTokenEvent';
import { Node } from '~/Type/Definition/Node';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetTokenEvent tests', () => {
  it('should return null after creation', async () => {
    const getTokenEvent = new GetTokenEvent();

    expect(getTokenEvent.getToken()).to.be.null;
  });

  it('should return token when it was set', async () => {
    const getTokenEvent = new GetTokenEvent();

    const user: Node = {
      type: 'Token',
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
      data: {
        some: 'data',
      },
    };

    const promise = new Promise<Node>((resolve): void => {
      resolve(user);
    });

    getTokenEvent.setToken(promise);

    expect(getTokenEvent.getToken()).to.equal(promise);
  });
});
