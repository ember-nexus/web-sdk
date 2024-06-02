import { expect } from 'chai';

import * as Src from '../../src';
import { EmberNexus } from '../../src/Service';

describe('Src tests', () => {
  it('should verify that src exports everything', async () => {
    expect(Object.keys(Src).length).to.be.equal(8);
  });
  it('should verify that Container is working', async () => {
    Src.Container.get(EmberNexus);
  });
});
