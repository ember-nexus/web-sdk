import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { EmberNexus, Logger, WebSdkConfiguration } from '../../../src/Service';
import { validateUuidFromString } from '../../../src/Type/Definition';
import { TestLogger } from '../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/32893cda-42db-4287-ac00-e73f250e1eeb', () => {
    return HttpResponse.json(
      {
        type: 'RELATION',
        id: '32893cda-42db-4287-ac00-e73f250e1eeb',
        start: 'ab5a01aa-6a02-42a9-9613-69d9453d0064',
        end: '0b624f56-a8ed-43f0-a250-4a821679a51f',
        data: {
          created: '2023-10-06T20:27:56+00:00',
          updated: '2023-10-06T20:27:56+00:00',
          name: 'Test relation',
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

test('EmberNexus should use the cache for repeated relation request', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('32893cda-42db-4287-ac00-e73f250e1eeb');

  const emberNexus = new EmberNexus();
  const relation1 = await emberNexus.getElement(uuid);
  const relation2 = await emberNexus.getElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/32893cda-42db-4287-ac00-e73f250e1eeb .',
    ),
  ).to.be.true;

  expect(relation1).to.be.deep.equal(relation2);

  mockServer.close();
});
