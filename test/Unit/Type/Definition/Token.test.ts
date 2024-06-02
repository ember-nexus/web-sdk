import { expect } from 'chai';

import { validateTokenFromString } from '../../../../src/Type/Definition';

describe('Token tests', () => {
  it('should validate real token without problems', async () => {
    const rawToken = 'secret-token:hash';
    validateTokenFromString(rawToken);
  });

  it('should throw exception if token does not match schema', async () => {
    const rawToken = 'something different';
    expect(() => {
      validateTokenFromString(rawToken);
    }).to.throw('Passed variable is not a valid token.');
  });
});
