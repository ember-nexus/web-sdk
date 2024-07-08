import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { DeleteTokenEndpoint } from '../../../../../src/Endpoint/User';
import { ParseError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/token', () => {
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

test('DeleteTokenEndpoint should handle bad response error', async () => {
  mockServer.listen();
  await expect(Container.get(DeleteTokenEndpoint).deleteToken()).to.eventually.be.rejectedWith(ParseError);

  expect(testLogger.assertDebugHappened('Executing HTTP DELETE request against url http://mock-api/token .')).to.be
    .true;

  expect(testLogger.assertErrorHappened("Unable to parse response as content type is not 'application/problem+json'."))
    .to.be.true;

  mockServer.close();
});
