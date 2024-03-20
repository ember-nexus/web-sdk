import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetTokenEndpoint from '~/Endpoint/User/GetTokenEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';

describe('GetTokenEndpoint tests', () => {
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

  it('should load token', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const token = await Container.get(GetTokenEndpoint).getToken();

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/token .',
    );

    expect(token).to.have.keys('id', 'type', 'data');
    expect(token).to.not.have.keys('start', 'end');
    expect(token.id).to.equal('e3b81351-fe0c-4f8f-ad22-78b6157edde8');
    expect(token.type).to.equal('Token');
    expect(Object.keys(token.data)).to.have.lengthOf(3);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));

    await expect(Container.get(GetTokenEndpoint).getToken()).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/token .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});
