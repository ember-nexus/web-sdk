import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostChangePasswordEndpoint } from '../../../../../src/Endpoint/User';
import { NetworkError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/change-password', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostChangePasswordEndpoint should handle network error', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const currentPassword = '1234';
  const newPassword = '4321';

  await expect(
    Container.get(PostChangePasswordEndpoint).postChangePassword(uniqueUserIdentifier, currentPassword, newPassword),
  ).to.eventually.be.rejectedWith(NetworkError);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/change-password .')).to
    .be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during creating resource.')).to.be.true;

  mockServer.close();
});
