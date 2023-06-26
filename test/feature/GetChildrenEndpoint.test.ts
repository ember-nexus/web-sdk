import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexusCache from '../../src/EmberNexusCache.js';
import Options from '../../src/Options.js';
import AccessStrategy from '../../src/Type/AccessStrategy.js';
import CollectionAccessStrategy from '../../src/Type/CollectionAccessStrategy.js';
import testLogger from '../testLogger.js';

describe('GetChildrenEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it.only('should load children from the api, when all cacheFirstThenAPI is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getChildren(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.All)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(4);
  });

  it.only('should load children from the api, when any cacheFirstThenAPI is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache
      .getChildren(testUuid, AccessStrategy.CacheFirstThenAPI, CollectionAccessStrategy.Any)
      .then((res2) => {
        return res2;
      });
    expect(res).to.be.length(4);
  });

  it.only('should fail if cache empty, when all cacheOnly is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(
      cache.getChildren(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.All),
    ).to.be.rejectedWith(Error, 'Not all children are in cache.');
  });

  it.only('should fail if cache empty, when any cacheOnly is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(
      cache.getChildren(testUuid, AccessStrategy.CacheOnly, CollectionAccessStrategy.Any),
    ).to.be.rejectedWith(Error, 'No child elements are in cache.');
  });

  it.only('should load all children from the api, when all API is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getChildren(testUuid, AccessStrategy.API, CollectionAccessStrategy.All).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(4);
  });

  it.only('should load all children from the api, when any API is active', async () => {
    const testUuid = '5cfd99bd-9b58-46ef-b11a-0c268488d055';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getChildren(testUuid, AccessStrategy.API, CollectionAccessStrategy.Any).then((res2) => {
      return res2;
    });
    expect(res).to.be.length(4);
  });
});
