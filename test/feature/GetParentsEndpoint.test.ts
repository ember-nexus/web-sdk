import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexusCache from '../../src/EmberNexusCache.js';
import Options from '../../src/Options.js';
import AccessStrategy from '../../src/Type/AccessStrategy.js';
import CollectionAccessStrategy from '../../src/Type/CollectionAccessStrategy.js';
import testLogger from '../testLogger.js';

describe('GetParentsEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should load parents from the api, when all cacheFirstThenAPI is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getParents(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.All)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(2);
  });

  it('should load parents from the api, when any cacheFirstThenAPI is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getParents(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.Any)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(2);
  });

  it('should fail if cache empty, when all cacheOnly is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(cache.getParents(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.All)).to.be.rejectedWith(
      Error,
      'Not all parents are in cache.',
    );
  });

  it('should fail if cache empty, when any cacheOnly is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(cache.getParents(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.Any)).to.be.rejectedWith(
      Error,
      'No parent elements are in cache.',
    );
  });

  it('should load all parents from the api, when all API is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getParents(testUuid, AccessStrategy.API, CollectionAccessStrategy.All).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(2);
  });

  it('should load all parents from the api, when any API is active', async () => {
    const testUuid = 'eecc9563-fa77-4d0f-9300-d75a976aacf6';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getParents(testUuid, AccessStrategy.API, CollectionAccessStrategy.Any).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(2);
  });
});
