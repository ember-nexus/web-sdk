import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostTokenEndpoint } from '../../../../../src/Endpoint/User';
import { NetworkError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/token', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostTokenEndpoint should handle network error', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const password = '1234';

  await expect(
    Container.get(PostTokenEndpoint).postToken(uniqueUserIdentifier, password),
  ).to.eventually.be.rejectedWith(NetworkError);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/token .')).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during creating resource.')).to.be.true;

  mockServer.close();
});
