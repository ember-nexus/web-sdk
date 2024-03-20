import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import PatchElementEndpoint from '~/Endpoint/Element/PatchElementEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Data } from '~/Type/Definition/Data';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.patch('http://mock-api/a89707ff-4720-44c3-b3be-6d054dd155a1', () => {
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

test('PatchElementEndpoint should handle no content type response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('a89707ff-4720-44c3-b3be-6d054dd155a1');
  const data: Data = {
    new: 'Data',
  };
  await expect(Container.get(PatchElementEndpoint).patchElement(uuid, data)).to.eventually.be.rejectedWith(ParseError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PATCH request against url http://mock-api/a89707ff-4720-44c3-b3be-6d054dd155a1 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  mockServer.close();
});
