import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexusCache from '../../src/EmberNexusCache.js';
import Options from '../../src/Options.js';
import testLogger from '../testLogger.js';

describe('SearchEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should load serach page', async () => {
    const payload = {
      query: {
        match: {
          name: 'data',
        },
      },
    };

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.fetchSearchPage(payload);
    expect(res).to.be.length(25);
  });
});
