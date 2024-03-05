import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox, match } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { NetworkError } from '~/Error/NetworkError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { mockServer } from '../../../../MockServer/mockServer';

describe('GetElementEndpoint network error tests', () => {
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

  it('should handle network error', async () => {
    await expect(
      Container.get(GetElementEndpoint).getElement(validateUuidFromString('df6604fb-72a1-4616-90b1-e72eee3aca6c')),
    ).to.eventually.be.rejectedWith(NetworkError);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://mock-api/df6604fb-72a1-4616-90b1-e72eee3aca6c .',
    );

    assert.calledOnceWithExactly(
      mockedLogger.error,
      'Experienced generic network error during fetching resource.',
      match.any,
    );
  });
});
