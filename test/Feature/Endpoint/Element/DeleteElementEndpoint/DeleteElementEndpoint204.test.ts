import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { DeleteElementEndpoint } from '~/Endpoint/Element/DeleteElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const mockServer = setupServer(
  http.delete('http://mock-api/52965378-8305-43bf-a637-b24d0d29c1c9', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('DeleteElementEndpoint should handle 204 response', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('52965378-8305-43bf-a637-b24d0d29c1c9');

  await Container.get(DeleteElementEndpoint).deleteElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/52965378-8305-43bf-a637-b24d0d29c1c9 .',
    ),
  ).to.be.true;

  mockServer.close();
});
