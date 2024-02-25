import { expect } from 'chai';

import { PostChangePasswordEvent } from '~/BrowserEvent/User/PostChangePasswordEvent';
import { Data } from '~/Type/Definition/Data';

describe('PostChangePasswordEvent tests', () => {
  it('should set attributes to null if not explicitly defined', async () => {
    const currentPassword = '1234';
    const newPassword = '5678';
    const postChangePasswordEvent = new PostChangePasswordEvent(currentPassword, newPassword);

    expect(postChangePasswordEvent.getCurrentPassword()).to.equal(currentPassword);
    expect(postChangePasswordEvent.getNewPassword()).to.equal(newPassword);
    expect(postChangePasswordEvent.getData()).to.be.empty;
    expect(postChangePasswordEvent.getResult()).to.be.null;
  });

  it('should return attributes if explicitly defined', async () => {
    const currentPassword = '1234';
    const newPassword = '5678';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postChangePasswordEvent = new PostChangePasswordEvent(currentPassword, newPassword, data);

    expect(postChangePasswordEvent.getCurrentPassword()).to.equal(currentPassword);
    expect(postChangePasswordEvent.getNewPassword()).to.equal(newPassword);
    expect(postChangePasswordEvent.getData().email).to.equal('user@localhost.dev');
    expect(postChangePasswordEvent.getResult()).to.be.null;
  });

  it('should return promise if set', async () => {
    const currentPassword = '1234';
    const newPassword = '5678';
    const data: Data = {
      email: 'user@localhost.dev',
    };
    const postChangePasswordEvent = new PostChangePasswordEvent(currentPassword, newPassword, data);

    const promise = new Promise<void>((resolve): void => {
      resolve();
    });

    postChangePasswordEvent.setResult(promise);

    expect(postChangePasswordEvent.getResult()).to.equal(promise);
  });
});
