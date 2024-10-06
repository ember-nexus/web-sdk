import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostChangePasswordEndpoint } from '../../../../../src/Endpoint/User';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/change-password', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {},
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostChangePasswordEndpoint should handle node response', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const currentPassword = '1234';
  const newPassword = '4321';

  await Container.get(PostChangePasswordEndpoint).postChangePassword(
    uniqueUserIdentifier,
    currentPassword,
    newPassword,
  );

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/change-password .')).to
    .be.true;

  mockServer.close();
});
