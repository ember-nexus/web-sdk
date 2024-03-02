import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, createSandbox } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Response401UnauthorizedError } from '~/Error/Response401UnauthorizedError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { mockServer } from '../../../../MockServer/mockServer';

describe('GetElementEndpoint tests', () => {
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

  it('should handle unauthorized 401 error', async () => {
    await expect(
      Container.get(GetElementEndpoint).getElement(validateUuidFromString('5324396a-636a-4263-ac38-62fef3132ead')),
    ).to.eventually.be.rejectedWith(Response401UnauthorizedError);
  });
});
