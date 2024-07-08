import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetIndexEndpoint } from '../../../../../src/Endpoint/Element';
import { Response401UnauthorizedError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/401/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail:
          "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      },
      {
        status: 401,
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

test('GetIndexEndpoint should handle bad response error', async () => {
  mockServer.listen();
  await expect(Container.get(GetIndexEndpoint).getIndex()).to.eventually.be.rejectedWith(Response401UnauthorizedError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/?page=1&pageSize=25 .'))
    .to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 401 unauthorized.')).to.be.true;

  mockServer.close();
});
