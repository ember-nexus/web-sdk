import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';
import { Container } from 'typedi';

import { Logger, WebSdkConfiguration } from '../../../src/Service';
import { validateTokenFromString } from '../../../src/Type/Definition';
import { TestLogger } from '../TestLogger';

describe('WebSdkConfiguration tests', () => {
  let sandbox: SinonSandbox;
  let testLogger: TestLogger;

  beforeEach(() => {
    sandbox = createSandbox();

    testLogger = new TestLogger();
    Container.set(Logger, testLogger);
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
  });

  it('should return default values', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);

    expect(webSdkConfiguration.getToken()).to.be.null;
    expect(webSdkConfiguration.getApiHost()).to.be.equal('');
    expect(webSdkConfiguration.getElementCacheMaxEntries()).to.be.equal(100);
    expect(webSdkConfiguration.getCollectionCacheMaxEntries()).to.be.equal(50);
    expect(webSdkConfiguration.getCollectionPageSize()).to.be.equal(25);
  });

  it('should correctly save the token', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const token = validateTokenFromString('secret-token:someToken');

    expect(webSdkConfiguration.getToken()).to.be.null;
    webSdkConfiguration.setToken(token);
    expect(webSdkConfiguration.getToken()).to.be.equal(token);
  });

  it('should correctly save the api host', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const apiHost = 'https://localhost';

    expect(webSdkConfiguration.getApiHost()).to.be.equal('');
    webSdkConfiguration.setApiHost(apiHost);
    expect(webSdkConfiguration.getApiHost()).to.be.equal(apiHost);
  });

  it('should warn if the api host has a trailing slash', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const apiHost = 'https://localhost/';

    expect(webSdkConfiguration.getApiHost()).to.be.equal('');
    webSdkConfiguration.setApiHost(apiHost);
    expect(webSdkConfiguration.getApiHost()).to.not.be.equal(apiHost);
    expect(webSdkConfiguration.getApiHost()).to.be.equal('https://localhost');
    expect(
      testLogger.assertWarnHappened(
        'Removed trailing slash from API host configuration due to internal requirement. Please check if trailing slash can be directly removed.',
      ),
    ).to.be.true;
  });

  it('should warn if the api host has multiple trailing slashes', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const apiHost = 'https://localhost///';

    expect(webSdkConfiguration.getApiHost()).to.be.equal('');
    webSdkConfiguration.setApiHost(apiHost);
    expect(webSdkConfiguration.getApiHost()).to.not.be.equal(apiHost);
    expect(webSdkConfiguration.getApiHost()).to.be.equal('https://localhost');
    expect(
      testLogger.assertWarnHappened(
        'Removed trailing slash from API host configuration due to internal requirement. Please check if trailing slash can be directly removed.',
      ),
    ).to.be.true;
  });

  it('should correctly save the element cache max entries', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const elementCacheMaxEntries = 999;

    expect(webSdkConfiguration.getElementCacheMaxEntries()).to.be.equal(100);
    webSdkConfiguration.setElementCacheMaxEntries(elementCacheMaxEntries);
    expect(webSdkConfiguration.getElementCacheMaxEntries()).to.be.equal(elementCacheMaxEntries);
  });

  it('should correctly save the collection cache max entries', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const collectionCacheMaxEntries = 999;

    expect(webSdkConfiguration.getCollectionCacheMaxEntries()).to.be.equal(50);
    webSdkConfiguration.setCollectionCacheMaxEntries(collectionCacheMaxEntries);
    expect(webSdkConfiguration.getCollectionCacheMaxEntries()).to.be.equal(collectionCacheMaxEntries);
  });

  it('should correctly save the collection page size', () => {
    const webSdkConfiguration = Container.get(WebSdkConfiguration);
    const collectionPageSize = 999;

    expect(webSdkConfiguration.getCollectionPageSize()).to.be.equal(25);
    webSdkConfiguration.setCollectionPageSize(collectionPageSize);
    expect(webSdkConfiguration.getCollectionPageSize()).to.be.equal(collectionPageSize);
  });
});
