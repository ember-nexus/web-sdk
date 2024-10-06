import { expect } from 'chai';

import * as Src from '../../src';
import { EmberNexus } from '../../src/Service';

describe('Src tests', () => {
  it('should verify that src exports everything', () => {
    expect(Object.keys(Src).length).to.be.equal(8);
  });
  it('should verify that Container is working', () => {
    Src.Container.get(EmberNexus);
  });
});
