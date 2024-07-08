import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { EmberNexus, Logger, WebSdkConfiguration } from '../../../src/Service';
import { validateUuidFromString } from '../../../src/Type/Definition';
import { TestLogger } from '../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/eb243613-832b-411a-a161-616cdd75e2f9', () => {
    return HttpResponse.json(
      {
        type: 'RELATION',
        id: 'eb243613-832b-411a-a161-616cdd75e2f9',
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

test('EmberNexus should handle relation request', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('eb243613-832b-411a-a161-616cdd75e2f9');

  const emberNexus = new EmberNexus();
  const relation = await emberNexus.getElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/eb243613-832b-411a-a161-616cdd75e2f9 .',
    ),
  ).to.be.true;

  expect(relation).to.have.keys('id', 'start', 'end', 'type', 'data');
  expect(relation.id).to.equal(uuid);
  expect(relation.type).to.equal('RELATION');
  expect(relation.data.created).to.be.instanceof(Date);
  expect(relation.data.updated).to.be.instanceof(Date);
  expect(Object.keys(relation.data)).to.have.lengthOf(3);

  mockServer.close();
});
