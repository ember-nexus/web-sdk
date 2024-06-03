import { expect } from 'chai';

import { ValidationError } from '../../../src/Error';

describe('ValidationError tests', () => {
  test('that the empty constructor sets the correct properties', () => {
    const networkError = new ValidationError();

    expect(networkError.name).to.equal('ValidationError');
  });

  test('that the full constructor sets the correct properties', () => {
    const networkError = new ValidationError('message');

    expect(networkError.name).to.equal('ValidationError');
    expect(networkError.message).to.equal('message');
  });
});
