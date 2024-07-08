import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetIndexEndpoint } from '../../../../../src/Endpoint/Element';
import { ParseError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/', () => {
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

test('GetIndexEndpoint should handle no content type response error', async () => {
  mockServer.listen();
  await expect(Container.get(GetIndexEndpoint).getIndex()).to.eventually.be.rejectedWith(ParseError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/?page=1&pageSize=25 .'))
    .to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  mockServer.close();
});
