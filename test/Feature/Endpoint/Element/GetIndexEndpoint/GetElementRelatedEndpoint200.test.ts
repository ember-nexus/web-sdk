import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetIndexEndpoint } from '~/Endpoint/Element/GetIndexEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

const mockServer = setupServer(
  http.get('http://mock-api/', () => {
    return HttpResponse.json(
      {
        type: '_PartialCollection',
        id: '/',
        totalNodes: 2,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [
          {
            type: 'Tag',
            id: '45482998-274a-43d0-a466-f31d0b24cc0a',
            data: {
              created: '2023-10-25T10:44:39+00:00',
              updated: '2023-10-25T10:44:39+00:00',
              name: 'Yellow',
              color: '#FFC835',
            },
          },
          {
            type: 'Tag',
            id: '6b8341ca-851a-4e98-8194-e57b87d30519',
            data: {
              created: '2023-10-25T10:44:39+00:00',
              updated: '2023-10-25T10:44:39+00:00',
              name: 'Red',
              color: '#BD002A',
            },
          },
        ],
        relations: [],
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

test('GetIndexEndpoint should handle collection response', async () => {
  mockServer.listen();
  const collection = await Container.get(GetIndexEndpoint).getIndex();

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/?page=1&pageSize=25 .'))
    .to.be.true;

  expect(collection).to.have.keys('id', 'links', 'totalNodes', 'nodes', 'relations');
  expect(Object.keys(collection.nodes)).to.have.lengthOf(2);
  expect(Object.keys(collection.relations)).to.have.lengthOf(0);

  mockServer.close();
});
