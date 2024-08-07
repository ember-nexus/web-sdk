import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PutElementEndpoint } from '../../../../../src/Endpoint/Element';
import { ParseError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.put('http://mock-api/e0a92271-2d54-4517-9bec-29749b0ece7d', () => {
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

test('PutElementEndpoint should handle no content type response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('e0a92271-2d54-4517-9bec-29749b0ece7d');
  const data: Data = {
    new: 'Data',
  };
  await expect(Container.get(PutElementEndpoint).putElement(uuid, data)).to.eventually.be.rejectedWith(ParseError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PUT request against url http://mock-api/e0a92271-2d54-4517-9bec-29749b0ece7d .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  mockServer.close();
});
