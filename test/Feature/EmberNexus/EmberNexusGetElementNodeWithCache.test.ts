import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { EmberNexus, Logger, WebSdkConfiguration } from '../../../src/Service';
import { validateUuidFromString } from '../../../src/Type/Definition';
import { TestLogger } from '../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/2ce13d4f-bd96-4b71-b4e7-d43bd9948836', () => {
    return HttpResponse.json(
      {
        type: 'Data',
        id: '2ce13d4f-bd96-4b71-b4e7-d43bd9948836',
        data: {
          created: '2023-10-06T20:27:56+00:00',
          updated: '2023-10-06T20:27:56+00:00',
          name: 'Test Data',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('EmberNexus should use the cache for repeated node requests', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('2ce13d4f-bd96-4b71-b4e7-d43bd9948836');

  const emberNexus = new EmberNexus();
  const node1 = await emberNexus.getElement(uuid);
  const node2 = await emberNexus.getElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/2ce13d4f-bd96-4b71-b4e7-d43bd9948836 .',
    ),
  ).to.be.true;

  expect(node1).to.be.deep.equal(node2);

  mockServer.close();
});
