import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetElementChildrenEndpoint from '~/Endpoint/Element/GetElementChildrenEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementChildrenEndpoint tests', () => {
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

  it('should load children of a node', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const parentUuid = validateUuidFromString('56fda20c-b238-4034-b555-1df47c47e17a');
    const collection = await Container.get(GetElementChildrenEndpoint).getElementChildren(parentUuid);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/56fda20c-b238-4034-b555-1df47c47e17a/children?page=1&pageSize=25 .',
    );

    expect(collection).to.have.keys('id', 'totalNodes', 'links', 'nodes', 'relations');
    expect(collection.nodes).to.have.lengthOf(6);
    expect(collection.relations).to.have.lengthOf(6);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));
    const parentUuid = validateUuidFromString('56fda20c-b238-4034-b555-1df47c47e17a');

    await expect(
      Container.get(GetElementChildrenEndpoint).getElementChildren(parentUuid),
    ).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/56fda20c-b238-4034-b555-1df47c47e17a/children?page=1&pageSize=25 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });

  it('should throw error 404 if element is not found', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);
    const uuidWhichDoesNotExist = validateUuidFromString('00000000-0000-4000-a000-000000000000');

    await expect(
      Container.get(GetElementChildrenEndpoint).getElementChildren(uuidWhichDoesNotExist),
    ).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Not found',
      detail: 'Requested element was not found.',
      status: 404,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/00000000-0000-4000-a000-000000000000/children?page=1&pageSize=25 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});
