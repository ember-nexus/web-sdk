import { expect } from 'chai';

import * as Type from '../../../src/Type';

describe('Type tests', () => {
  it('should verify that Type exports everything', async () => {
    expect(Object.keys(Type).length).to.be.equal(3);
  });
});
