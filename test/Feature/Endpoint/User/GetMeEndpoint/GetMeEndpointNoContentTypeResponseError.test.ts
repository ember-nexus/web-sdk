import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetMeEndpoint } from '~/Endpoint/User/GetMeEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
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

test('GetMeEndpoint should handle no content type response error', async () => {
  mockServer.listen();
  await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejectedWith(ParseError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  mockServer.close();
});
