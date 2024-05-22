import { expect } from 'chai';
import { http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { PostIndexEndpoint } from '~/Endpoint/Element/PostIndexEndpoint';
import { NetworkError } from '~/Error/NetworkError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';

const mockServer = setupServer(
  http.post('http://mock-api/', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostIndexEndpoint should handle network error', async () => {
  mockServer.listen();
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };
  await expect(Container.get(PostIndexEndpoint).postIndex(element)).to.eventually.be.rejectedWith(NetworkError);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/ .')).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during creating resource.')).to.be.true;

  mockServer.close();
});
