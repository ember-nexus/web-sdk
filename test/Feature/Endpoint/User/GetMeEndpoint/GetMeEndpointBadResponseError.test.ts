import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetMeEndpoint } from '~/Endpoint/User/GetMeEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
    return HttpResponse.text('Some content which can not be interpreted as JSON.', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetMeEndpoint should handle bad response error', async () => {
  mockServer.listen();
  await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejectedWith(ParseError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(
    testLogger.assertErrorHappened(
      "Unable to parse response as content type is neither 'application/json' nor 'application/problem+json'.",
    ),
  ).to.be.true;

  mockServer.close();
});
