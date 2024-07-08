import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostElementEndpoint } from '../../../../../src/Endpoint/Element';
import { NetworkError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { NodeWithOptionalId, validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/c14ea082-135c-42a8-9691-6ea121185e9d', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostElementEndpoint should handle network error', async () => {
  mockServer.listen();
  const parentUuid = validateUuidFromString('c14ea082-135c-42a8-9691-6ea121185e9d');
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };
  await expect(Container.get(PostElementEndpoint).postElement(parentUuid, element)).to.eventually.be.rejectedWith(
    NetworkError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP POST request against url http://mock-api/c14ea082-135c-42a8-9691-6ea121185e9d .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during creating resource.')).to.be.true;

  mockServer.close();
});
