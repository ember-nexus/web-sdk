import { expect } from 'chai';

import { DeleteTokenEvent } from '../../../../src/BrowserEvent/User';

describe('DeleteTokenEvent tests', () => {
  test('DeleteTokenEvent returns correct type', () => {
    expect(DeleteTokenEvent.type).to.equal('ember-nexus-delete-token');
  });

  it('should return null when no result was set', async () => {
    const deleteTokenEvent = new DeleteTokenEvent();

    expect(deleteTokenEvent.getResult()).to.be.null;
  });

  it('should return promise when result was set', async () => {
    const deleteTokenEvent = new DeleteTokenEvent();

    const promise = new Promise<void>((resolve): void => {
      resolve();
    });

    deleteTokenEvent.setResult(promise);

    expect(deleteTokenEvent.getResult()).to.equal(promise);
  });
});
