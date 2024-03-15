import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

function customSetup(sandbox, mockServer, mockedLogger) {
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
}

export { customSetup };
