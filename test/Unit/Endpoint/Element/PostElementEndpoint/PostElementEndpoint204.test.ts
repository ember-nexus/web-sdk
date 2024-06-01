import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostElementEndpoint } from '../../../../../src/Endpoint/Element';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { NodeWithOptionalId, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/8341cc07-5c67-4699-9a6b-47b95f6ea9a0', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        Location: '/58473dde-e4ec-46fc-89c0-183af3205e51',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostElementEndpoint should handle 204 response', async () => {
  mockServer.listen();
  const parentUuid = validateUuidFromString('8341cc07-5c67-4699-9a6b-47b95f6ea9a0');
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };
  const uuid = await Container.get(PostElementEndpoint).postElement(parentUuid, element);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP POST request against url http://mock-api/8341cc07-5c67-4699-9a6b-47b95f6ea9a0 .',
    ),
  ).to.be.true;

  expect(uuid as string).to.be.equal('58473dde-e4ec-46fc-89c0-183af3205e51');

  mockServer.close();
});
