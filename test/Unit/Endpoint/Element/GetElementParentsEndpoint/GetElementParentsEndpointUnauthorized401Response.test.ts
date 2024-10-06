import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetElementParentsEndpoint } from '../../../../../src/Endpoint/Element';
import { Response401UnauthorizedError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

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

test('GetElementParentsEndpoint should handle unauthorized response error', async () => {
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

  expect(testLogger.assertErrorHappened('Server returned 401 unauthorized.')).to.be.true;

  mockServer.close();
});
