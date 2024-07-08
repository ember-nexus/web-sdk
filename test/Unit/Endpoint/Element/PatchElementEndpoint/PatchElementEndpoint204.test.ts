import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PatchElementEndpoint } from '../../../../../src/Endpoint/Element';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.patch('http://mock-api/0050c1f6-8be7-4615-bd3a-82d0f85d1f2d', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PatchElementEndpoint should handle 204 response', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('0050c1f6-8be7-4615-bd3a-82d0f85d1f2d');
  const data: Data = {
    new: 'Data',
  };
  await Container.get(PatchElementEndpoint).patchElement(uuid, data);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PATCH request against url http://mock-api/0050c1f6-8be7-4615-bd3a-82d0f85d1f2d .',
    ),
  ).to.be.true;

  mockServer.close();
});
