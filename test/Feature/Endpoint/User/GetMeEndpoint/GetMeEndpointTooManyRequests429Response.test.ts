import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetMeEndpoint } from '~/Endpoint/User/GetMeEndpoint';
import { Response429TooManyRequestsError } from '~/Error/Response429TooManyRequestsError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
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

test('GetMeEndpoint should handle bad response error', async () => {
  mockServer.listen();
  await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejectedWith(Response429TooManyRequestsError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 429 too many requests.')).to.be.true;

  mockServer.close();
});
