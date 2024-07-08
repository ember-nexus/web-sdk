import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PatchElementEndpoint } from '../../../../../src/Endpoint/Element';
import { Response404NotFoundError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.patch('http://mock-api/49650ebe-c5ae-48dc-a3c8-31e7ea44a8f0', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/404/not-found',
        title: 'NotFound',
        status: 404,
        detail: 'Requested element was not found.',
      },
      {
        status: 404,
        headers: {
          'Content-Type': 'application/problem+json; charset=utf-8',
        },
      },
    );
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PatchElementEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('49650ebe-c5ae-48dc-a3c8-31e7ea44a8f0');
  const data: Data = {
    new: 'Data',
  };

  await expect(Container.get(PatchElementEndpoint).patchElement(uuid, data)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PATCH request against url http://mock-api/49650ebe-c5ae-48dc-a3c8-31e7ea44a8f0 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 404 not found.')).to.be.true;

  mockServer.close();
});
