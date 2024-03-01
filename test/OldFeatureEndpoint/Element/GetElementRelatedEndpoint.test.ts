import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetElementRelatedEndpoint from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementRelatedEndpoint tests', () => {
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

  it('should load related elements of a node', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const centerUuid = validateUuidFromString('45482998-274a-43d0-a466-f31d0b24cc0a');
    const collection = await Container.get(GetElementRelatedEndpoint).getElementRelated(centerUuid);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/45482998-274a-43d0-a466-f31d0b24cc0a/related?page=1&pageSize=25 .',
    );

    expect(collection).to.have.keys('id', 'totalNodes', 'links', 'nodes', 'relations');
    expect(collection.nodes).to.have.lengthOf(3);
    expect(collection.relations).to.have.lengthOf(3);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));
    const centerUuid = validateUuidFromString('45482998-274a-43d0-a466-f31d0b24cc0a');

    await expect(
      Container.get(GetElementRelatedEndpoint).getElementRelated(centerUuid),
    ).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/45482998-274a-43d0-a466-f31d0b24cc0a/related?page=1&pageSize=25 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });

  it('should throw error 404 if element is not found', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);
    const uuidWhichDoesNotExist = validateUuidFromString('00000000-0000-4000-a000-000000000000');

    await expect(
      Container.get(GetElementRelatedEndpoint).getElementRelated(uuidWhichDoesNotExist),
    ).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Not found',
      detail: 'Requested element was not found.',
      status: 404,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/00000000-0000-4000-a000-000000000000/related?page=1&pageSize=25 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});