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

test('EmberNexus should handle node request', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('2ce13d4f-bd96-4b71-b4e7-d43bd9948836');

  const emberNexus = new EmberNexus();
  const node = await emberNexus.getElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/2ce13d4f-bd96-4b71-b4e7-d43bd9948836 .',
    ),
  ).to.be.true;

  expect(node).to.have.keys('id', 'type', 'data');
  expect(node).to.not.have.keys('start', 'end');
  expect(node.id).to.equal(uuid);
  expect(node.type).to.equal('Data');
  expect(node.data.created).to.be.instanceof(Date);
  expect(node.data.updated).to.be.instanceof(Date);
  expect(Object.keys(node.data)).to.have.lengthOf(3);

  mockServer.close();
});
