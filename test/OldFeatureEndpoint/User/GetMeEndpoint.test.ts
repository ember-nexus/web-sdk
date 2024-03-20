import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetMeEndpoint from '~/Endpoint/User/GetMeEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';

describe('GetMeEndpoint tests', () => {
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

  it('should load me', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

    const me = await Container.get(GetMeEndpoint).getMe();

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/me .',
    );

    expect(me).to.have.keys('id', 'type', 'data');
    expect(me).to.not.have.keys('start', 'end');
    expect(me.id).to.equal('7e86b9ec-b1dc-4aed-a627-eb77b265e12c');
    expect(me.type).to.equal('User');
    expect(Object.keys(me.data)).to.have.lengthOf(4);
  });

  it('should throw error 401 if token is invalid', async () => {
    Container.get(WebSdkConfiguration).setToken(validateTokenFromString('secret-token:IdoNotWorkLol'));

    await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejected.and.deep.include({
      category: 'server',
      title: 'Unauthorized',
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      status: 401,
    });

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://ember-nexus-dev-api/me .',
    );

    assert.calledOnceWithExactly(mockedLogger.error, match.object);
  });
});
