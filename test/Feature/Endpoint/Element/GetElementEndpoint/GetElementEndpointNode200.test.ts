import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5', () => {
    return HttpResponse.json(
      {
        type: 'Data',
        id: 'b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5',
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

test('GetElementEndpoint should handle node response', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5');

  const node = await Container.get(GetElementEndpoint).getElement(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5 .',
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
