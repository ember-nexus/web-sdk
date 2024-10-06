import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostRegisterEndpoint } from '../../../../../src/Endpoint/User';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/register', () => {
    return new HttpResponse(null, {
      status: 201,
      headers: {
        Location: '/a5f95955-1d24-43db-8832-f365e6a96dfa',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostRegisterEndpoint should handle node response', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const password = '1234';

  const userUuid = await Container.get(PostRegisterEndpoint).postRegister(uniqueUserIdentifier, password);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/register .')).to.be
    .true;

  expect(userUuid as string).to.equal('a5f95955-1d24-43db-8832-f365e6a96dfa');

  mockServer.close();
});
