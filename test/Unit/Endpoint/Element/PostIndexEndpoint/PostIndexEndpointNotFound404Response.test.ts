import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { PostIndexEndpoint } from '../../../../../src/Endpoint/Element';
import { Response404NotFoundError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { NodeWithOptionalId } from '../../../../../src/Type/Definition';
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

  expect(testLogger.assertErrorHappened('Server returned 404 not found.')).to.be.true;

  mockServer.close();
});
