import { expect } from 'chai';

import { NetworkError } from '../../../src/Error';

describe('NetworkError tests', () => {
  test('that the empty constructor sets the correct properties', () => {
    const networkError = new NetworkError();

    expect(networkError.name).to.equal('NetworkError');
    expect(networkError.cause).to.be.undefined;
  });

  test('that the full constructor sets the correct properties', () => {
    const networkError = new NetworkError('message', 'something');

    expect(networkError.name).to.equal('NetworkError');
    expect(networkError.cause).to.equal('something');
    expect(networkError.message).to.equal('message');
  });
});
