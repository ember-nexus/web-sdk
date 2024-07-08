import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PatchElementEndpoint } from '../../../../../src/Endpoint/Element';
import { NetworkError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.patch('http://mock-api/8e9882c9-be64-460c-9605-439c25801e87', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PatchElementEndpoint should handle network error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('8e9882c9-be64-460c-9605-439c25801e87');
  const data: Data = {
    new: 'Data',
  };
  await expect(Container.get(PatchElementEndpoint).patchElement(uuid, data)).to.eventually.be.rejectedWith(
    NetworkError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PATCH request against url http://mock-api/8e9882c9-be64-460c-9605-439c25801e87 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during patching resource.')).to.be.true;

  mockServer.close();
});
