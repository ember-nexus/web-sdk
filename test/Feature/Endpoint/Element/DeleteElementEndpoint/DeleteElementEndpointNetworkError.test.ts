import { expect } from 'chai';
import { http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '~/Endpoint/Element/DeleteElementEndpoint';
import { NetworkError } from '~/Error/NetworkError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/13be6cab-fb8f-462d-b925-a5a9368e5e2f', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('DeleteElementEndpoint should handle network error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('13be6cab-fb8f-462d-b925-a5a9368e5e2f');

  await expect(Container.get(DeleteElementEndpoint).deleteElement(uuid)).to.eventually.be.rejectedWith(NetworkError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/13be6cab-fb8f-462d-b925-a5a9368e5e2f .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during deleting resource.')).to.be.true;

  mockServer.close();
});
