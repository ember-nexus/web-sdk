import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PutElementEndpoint } from '../../../../../src/Endpoint/Element';
import { NetworkError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { Data, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.put('http://mock-api/547c1fba-4797-48fa-8e31-0b61f8e46a74', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PutElementEndpoint should handle network error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('547c1fba-4797-48fa-8e31-0b61f8e46a74');
  const data: Data = {
    new: 'Data',
  };
  await expect(Container.get(PutElementEndpoint).putElement(uuid, data)).to.eventually.be.rejectedWith(NetworkError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PUT request against url http://mock-api/547c1fba-4797-48fa-8e31-0b61f8e46a74 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during updating resource.')).to.be.true;

  mockServer.close();
});
