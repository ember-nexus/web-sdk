import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementParentsEndpoint } from '~/Endpoint/Element/GetElementParentsEndpoint';
import { Response401UnauthorizedError } from '~/Error/Response401UnauthorizedError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const mockServer = setupServer(
  http.get('http://mock-api/6b2e22d9-33a9-4b42-8d2a-61c8945f357f/parents', () => {
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

test('GetElementParentsEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('6b2e22d9-33a9-4b42-8d2a-61c8945f357f');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid)).to.eventually.be.rejectedWith(
    Response401UnauthorizedError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/6b2e22d9-33a9-4b42-8d2a-61c8945f357f/parents?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 401 unauthorized.')).to.be.true;

  mockServer.close();
});
