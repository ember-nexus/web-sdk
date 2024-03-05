import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { mockServer } from '../../../../MockServer/mockServer';

describe('GetElementEndpoint bad response error tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  beforeEach(() => {
    sandbox = createSandbox();

    mockServer.listen();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);

    Container.get(WebSdkConfiguration).setApiHost('http://mock-api');
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
    mockServer.close();
  });

  it('should handle bad response error', async () => {
    await expect(
      Container.get(GetElementEndpoint).getElement(validateUuidFromString('afaa7a87-e523-4bf0-afe8-d2a11802c549')),
    ).to.eventually.be.rejectedWith(ParseError);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://mock-api/afaa7a87-e523-4bf0-afe8-d2a11802c549 .',
    );

    assert.calledOnceWithExactly(
      mockedLogger.error,
      "Unable to parse response as content type is neither 'application/json' nor 'application/problem+json'.",
      match.any,
    );
  });
});
