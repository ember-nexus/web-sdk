import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '../../../../../src/Endpoint/Element';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/52965378-8305-43bf-a637-b24d0d29c1c9', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
);

const testLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('DeleteElementEndpoint should handle 204 response', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');

  const uuid = validateUuidFromString('52965378-8305-43bf-a637-b24d0d29c1c9');
  await Container.get(DeleteElementEndpoint).deleteElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/52965378-8305-43bf-a637-b24d0d29c1c9 .',
    ),
  ).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/52965378-8305-43bf-a637-b24d0d29c1c9');

  mockServer.close();
  sandbox.restore();
});
