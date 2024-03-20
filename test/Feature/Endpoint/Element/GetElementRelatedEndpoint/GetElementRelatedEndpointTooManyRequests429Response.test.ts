import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import GetElementRelatedEndpoint from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { Response429TooManyRequestsError } from '~/Error/Response429TooManyRequestsError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/428a18c2-3152-4a8b-a0fc-9e987d3abe3d/related', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/429/too-many-requests',
        title: 'Unauthorized',
        status: 429,
        detail: 'wip',
      },
      {
        status: 429,
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

test('GetElementRelatedEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('428a18c2-3152-4a8b-a0fc-9e987d3abe3d');

  await expect(Container.get(GetElementRelatedEndpoint).getElementRelated(uuid)).to.eventually.be.rejectedWith(
    Response429TooManyRequestsError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/428a18c2-3152-4a8b-a0fc-9e987d3abe3d/related?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 429 too many requests.')).to.be.true;

  mockServer.close();
});
