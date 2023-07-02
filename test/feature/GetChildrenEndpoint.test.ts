import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexusCache from '../../src/EmberNexusCache.js';
import Options from '../../src/Options.js';
import AccessStrategy from '../../src/Type/AccessStrategy.js';
import CollectionAccessStrategy from '../../src/Type/CollectionAccessStrategy.js';
import testLogger from '../testLogger.js';

describe.only('GetChildrenEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should load all children from the api, when all cacheFirstThenAPI is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getChildren(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.All)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(124);
  });

  it('should load some children from the api, when any cacheFirstThenAPI is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getChildren(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.Any)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(50);
  });

  it('should fail if cache empty, when all cacheOnly is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(
      cache.getChildren(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.All),
    ).to.be.rejectedWith(Error, 'Not all children are in cache.');
  });

  it('should fail if cache empty, when any cacheOnly is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(
      cache.getChildren(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.Any),
    ).to.be.rejectedWith(Error, 'No child elements are in cache.');
  });

  it('should load all children from the api, when all API is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getChildren(testUuid, AccessStrategy.API, CollectionAccessStrategy.All).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(124);
  });

  it('should load some children from the api, when any API is active', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getChildren(testUuid, AccessStrategy.API, CollectionAccessStrategy.Any).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(50);
  });
});
