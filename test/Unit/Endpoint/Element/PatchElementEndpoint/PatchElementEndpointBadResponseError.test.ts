import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PatchElementEndpoint } from '../../../../../src/Endpoint/Element';
import { ParseError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.patch('http://mock-api/5734ae7f-3578-4a67-90e6-8f5fde108781', () => {
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

test('PatchElementEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('5734ae7f-3578-4a67-90e6-8f5fde108781');
  const data: Data = {
    new: 'Data',
  };
  await expect(Container.get(PatchElementEndpoint).patchElement(uuid, data)).to.eventually.be.rejectedWith(ParseError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PATCH request against url http://mock-api/5734ae7f-3578-4a67-90e6-8f5fde108781 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened("Unable to parse response as content type is not 'application/problem+json'."))
    .to.be.true;

  mockServer.close();
});
