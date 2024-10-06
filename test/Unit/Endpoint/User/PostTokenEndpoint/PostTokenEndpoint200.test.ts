import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostTokenEndpoint } from '../../../../../src/Endpoint/User';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/token', () => {
    return HttpResponse.json(
      {
        type: '_TokenResponse',
        token: 'secret-token:ERgAAnWl0CY8bQs0m11nZ3',
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostTokenEndpoint should handle node response', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const password = '1234';

  const token = await Container.get(PostTokenEndpoint).postToken(uniqueUserIdentifier, password);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/token .')).to.be.true;

  expect(token as string).to.equal('secret-token:ERgAAnWl0CY8bQs0m11nZ3');
  mockServer.close();
});
