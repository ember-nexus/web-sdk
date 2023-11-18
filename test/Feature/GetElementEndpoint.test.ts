import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

describe('GetElementEndpoint tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  const _token: Token = validateTokenFromString('secret-token:Au6srY6s3cW5THS6LeCl9Z');

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

  it('should load an accessible node', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const nodeUuid = validateUuidFromString('b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5');
    const node = await Container.get(GetElementEndpoint).getElement(nodeUuid);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5 .',
    );

    expect(node).to.have.keys('id', 'type', 'data');
    expect(node).to.not.have.keys('start', 'end');
    expect(node.id).to.equal(nodeUuid);
    expect(node.type).to.equal('Data');
    expect(Object.keys(node.data)).to.have.lengthOf(4);
  });

  it('should load an accessible relation', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const relationUuid = validateUuidFromString('fd9f4b9b-9831-4d8a-be98-a438f28e5038');
    const relation = await Container.get(GetElementEndpoint).getElement(relationUuid);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/fd9f4b9b-9831-4d8a-be98-a438f28e5038 .',
    );

    expect(relation).to.have.keys('id', 'type', 'data', 'start', 'end');
    expect(relation.id).to.equal(relationUuid);
    expect(relation.type).to.equal('RELATION');
    expect(Object.keys(relation.data)).to.have.lengthOf(3);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));
    const nodeUuid = validateUuidFromString('b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5');

    await expect(Container.get(GetElementEndpoint).getElement(nodeUuid)).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });

  it('should throw error 404 if element is not found', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);
    const uuidWhichDoesNotExist = validateUuidFromString('00000000-0000-4000-a000-000000000000');

    await expect(
      Container.get(GetElementEndpoint).getElement(uuidWhichDoesNotExist),
    ).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Not found',
      detail: 'Requested element was not found.',
      status: 404,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/00000000-0000-4000-a000-000000000000 .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});
