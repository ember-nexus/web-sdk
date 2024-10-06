import { expect } from 'chai';

import { PostChangePasswordEvent } from '../../../../src/BrowserEvent/User';
import { createUniqueUserIdentifierFromString } from '../../../../src/Type/Definition';

describe('PostChangePasswordEvent tests', () => {
  it('should return properties set in constructor', () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const currentPassword = '1234';
    const newPassword = '5678';
    const postChangePasswordEvent = new PostChangePasswordEvent(uniqueUserIdentifier, currentPassword, newPassword);

    expect(postChangePasswordEvent.getUniqueUserIdentifier()).to.equal(uniqueUserIdentifier);
    expect(postChangePasswordEvent.getCurrentPassword()).to.equal(currentPassword);
    expect(postChangePasswordEvent.getNewPassword()).to.equal(newPassword);
    expect(postChangePasswordEvent.getResult()).to.be.null;
  });

  it('should return promise if set', () => {
    const uniqueUserIdentifier = createUniqueUserIdentifierFromString('user@localhost.dev');
    const currentPassword = '1234';
    const newPassword = '5678';
    const postChangePasswordEvent = new PostChangePasswordEvent(uniqueUserIdentifier, currentPassword, newPassword);

    const promise = new Promise<void>((resolve): void => {
      resolve();
    });

    postChangePasswordEvent.setResult(promise);

    expect(postChangePasswordEvent.getResult()).to.equal(promise);
  });
});
