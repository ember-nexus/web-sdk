import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import GetElementParentsEndpoint from '~/Endpoint/Element/GetElementParentsEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/519fb22b-6b0c-403a-947f-eec3f9ac9209/parents', () => {
    return HttpResponse.json(
      {
        type: '_PartialCollection',
        id: '/519fb22b-6b0c-403a-947f-eec3f9ac9209/parents',
        totalNodes: 2,
        links: {
          first: '/519fb22b-6b0c-403a-947f-eec3f9ac9209/parents',
          previous: null,
          next: null,
          last: '/519fb22b-6b0c-403a-947f-eec3f9ac9209/parents',
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
        relations: [
          {
            type: 'OWNS',
            id: 'bc1ba1ad-5866-4c23-a58e-15282994c72c',
            start: '519fb22b-6b0c-403a-947f-eec3f9ac9209',
            end: '45482998-274a-43d0-a466-f31d0b24cc0a',
            data: {
              created: '2023-10-25T10:44:42+00:00',
              updated: '2023-10-25T10:44:42+00:00',
            },
          },
          {
            type: 'OWNS',
            id: '94ab04d8-c7a0-408c-aea7-59c66018b242',
            start: '519fb22b-6b0c-403a-947f-eec3f9ac9209',
            end: '6b8341ca-851a-4e98-8194-e57b87d30519',
            data: {
              created: '2023-10-25T10:44:42+00:00',
              updated: '2023-10-25T10:44:42+00:00',
            },
          },
        ],
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

test('GetElementParentsEndpoint should handle collection response', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('519fb22b-6b0c-403a-947f-eec3f9ac9209');

  const collection = await Container.get(GetElementParentsEndpoint).getElementParents(uuid);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/519fb22b-6b0c-403a-947f-eec3f9ac9209/parents?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(collection).to.have.keys('id', 'links', 'totalNodes', 'nodes', 'relations');
  expect(Object.keys(collection.nodes)).to.have.lengthOf(2);
  expect(Object.keys(collection.relations)).to.have.lengthOf(2);

  mockServer.close();
});
