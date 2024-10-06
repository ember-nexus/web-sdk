import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostChangePasswordEndpoint } from '../../../../../src/Endpoint/User';
import { Response401UnauthorizedError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/change-password', () => {
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

test('PostChangePasswordEndpoint should handle unauthorized response error', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const currentPassword = '1234';
  const newPassword = '4321';

  await expect(
    Container.get(PostChangePasswordEndpoint).postChangePassword(uniqueUserIdentifier, currentPassword, newPassword),
  ).to.eventually.be.rejectedWith(Response401UnauthorizedError);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/change-password .')).to
    .be.true;

  expect(testLogger.assertErrorHappened('Server returned 401 unauthorized.')).to.be.true;

  mockServer.close();
});
