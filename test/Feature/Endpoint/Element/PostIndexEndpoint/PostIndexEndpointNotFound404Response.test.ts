import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import PostIndexEndpoint from '~/Endpoint/Element/PostIndexEndpoint';
import { Response404NotFoundError } from '~/Error/Response404NotFoundError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/', () => {
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

test('PostIndexEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };

  await expect(Container.get(PostIndexEndpoint).postIndex(element)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(testLogger.assertDebugHappened('Executing HTTP POST request against url http://mock-api/ .')).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 404 not found.')).to.be.true;

  mockServer.close();
});
