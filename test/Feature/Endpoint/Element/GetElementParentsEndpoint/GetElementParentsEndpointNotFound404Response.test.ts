import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import GetElementParentsEndpoint from '~/Endpoint/Element/GetElementParentsEndpoint';
import { Response404NotFoundError } from '~/Error/Response404NotFoundError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/fb94bc52-66dd-4245-a6be-619e84e7cd4a/parents', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/404/not-found',
        title: 'NotFound',
        status: 404,
        detail: 'Requested element was not found.',
      },
      {
        status: 404,
        headers: {
          'Content-Type': 'application/problem+json; charset=utf-8',
        },
      },
    );
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetElementParentsEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('fb94bc52-66dd-4245-a6be-619e84e7cd4a');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/fb94bc52-66dd-4245-a6be-619e84e7cd4a/parents?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 404 not found.')).to.be.true;

  mockServer.close();
});
