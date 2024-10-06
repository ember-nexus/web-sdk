import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostTokenEndpoint } from '../../../../../src/Endpoint/User';
import { ParseError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { createUniqueUserIdentifierFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/token', () => {
    const response = HttpResponse.text('Some content which can not be interpreted as JSON.', {
      status: 200,
    });
    response.headers.delete('Content-Type');
    return response;
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostTokenEndpoint should handle no content type response error', async () => {
  mockServer.listen();

  const uniqueUserIdentifier = createUniqueUserIdentifierFromString('test@localhost.dev');
  const password = '1234';

  await expect(
    Container.get(PostTokenEndpoint).postToken(uniqueUserIdentifier, password),
  ).to.eventually.be.rejectedWith(ParseError);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/token .')).to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  mockServer.close();
});
