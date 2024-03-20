import { expect } from 'chai';

import { GetMeEvent } from '~/BrowserEvent/User/GetMeEvent';
import { Node } from '~/Type/Definition/Node';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetMeEvent tests', () => {
  it('should return null after creation', async () => {
    const getMeEvent = new GetMeEvent();

    expect(getMeEvent.getMe()).to.be.null;
  });

  it('should return user when it was set', async () => {
    const getMeEvent = new GetMeEvent();

    const user: Node = {
      type: 'User',
      id: validateUuidFromString('3c47a37c-6d6b-48d8-aac0-c6bc0d0ecc94'),
      data: {
        email: 'user@localhost.dev',
      },
    };

    const promise = new Promise<Node>((resolve): void => {
      resolve(user);
    });

    getMeEvent.setMe(promise);

    expect(getMeEvent.getMe()).to.equal(promise);
  });
});
