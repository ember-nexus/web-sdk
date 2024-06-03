import { expect } from 'chai';

import { LogicError } from '../../../src/Error';

describe('LogicError tests', () => {
  test('that the empty constructor sets the correct properties', () => {
    const networkError = new LogicError();

    expect(networkError.name).to.equal('LogicError');
  });

  test('that the full constructor sets the correct properties', () => {
    const networkError = new LogicError('message');

    expect(networkError.name).to.equal('LogicError');
    expect(networkError.message).to.equal('message');
  });
});
