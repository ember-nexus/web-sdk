import { expect } from 'chai';

import { Cache } from '../../../src/type/cache.js';

describe('cache tests', () => {
  it('should be able to perform basic operations', async () => {
    const cache = new Cache<string>();
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.false;
    cache.set('965cfd4a-a0d2-47c5-b0cb-b778615f6938', 'Hello world :D');
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.true;
    expect(cache.get('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.eql('Hello world :D');
    cache.set('965cfd4a-a0d2-47c5-b0cb-b778615f6938', 'new string');
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.true;
    expect(cache.get('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.eql('new string');
    cache.remove('965cfd4a-a0d2-47c5-b0cb-b778615f6938');
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.false;
    cache.set('965cfd4a-a0d2-47c5-b0cb-b778615f6938', 'Hello world :D');
    cache.clear();
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.false;
  });
  it('should be able to delete old elements', async () => {
    const cache = new Cache<string>(1);
    cache.set('965cfd4a-a0d2-47c5-b0cb-b778615f6938', 'Hello world :D');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    cache.set('5c2c4904-3369-4248-bba9-74e17e2fc870', 'Hello world :D');
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.true;
    expect(cache.has('5c2c4904-3369-4248-bba9-74e17e2fc870')).to.be.true;
    cache.clearOldElements();
    expect(cache.has('965cfd4a-a0d2-47c5-b0cb-b778615f6938')).to.be.false;
    expect(cache.has('5c2c4904-3369-4248-bba9-74e17e2fc870')).to.be.true;
  });
});
