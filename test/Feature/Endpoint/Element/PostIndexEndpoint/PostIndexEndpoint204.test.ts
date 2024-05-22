import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { PostIndexEndpoint } from '~/Endpoint/Element/PostIndexEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';

const mockServer = setupServer(
  http.post('http://mock-api/', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        Location: '/455a89b9-4ec7-4b02-b023-bcfbcbba9a9f',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostIndexEndpoint should handle 204 response', async () => {
  mockServer.listen();
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };
  const uuid = await Container.get(PostIndexEndpoint).postIndex(element);

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/ .')).to.be.true;

  expect(uuid as string).to.be.equal('455a89b9-4ec7-4b02-b023-bcfbcbba9a9f');

  mockServer.close();
});
