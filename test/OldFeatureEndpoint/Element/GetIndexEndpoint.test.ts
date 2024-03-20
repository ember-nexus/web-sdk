import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetIndexEndpoint from '~/Endpoint/Element/GetIndexEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';

describe('GetIndexEndpoint tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  const _token: Token = validateTokenFromString('secret-token:PIPeJGUt7c00ENn8a5uDlc');

  beforeEach(() => {
    sandbox = createSandbox();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);

    Container.get(WebSdkConfiguration).setApiHost('http://ember-nexus-dev-api');
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
  });

  it('should load index', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const collection = await Container.get(GetIndexEndpoint).getIndex();

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/?page=1&pageSize=25 .',
    );

    expect(collection).to.have.keys('id', 'totalNodes', 'links', 'nodes', 'relations');
    expect(collection.nodes).to.have.lengthOf(3);
    expect(collection.relations).to.have.lengthOf(0);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));

    await expect(Container.get(GetIndexEndpoint).getIndex()).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/?page=1&pageSize=25 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});
