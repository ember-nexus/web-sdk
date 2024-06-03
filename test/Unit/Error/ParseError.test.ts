import { expect } from 'chai';

import { ParseError } from '../../../src/Error';

describe('ParseError tests', () => {
  test('that the empty constructor sets the correct properties', () => {
    const networkError = new ParseError();

    expect(networkError.name).to.equal('ParseError');
  });

  test('that the full constructor sets the correct properties', () => {
    const networkError = new ParseError('message');

    expect(networkError.name).to.equal('ParseError');
    expect(networkError.message).to.equal('message');
  });
});
