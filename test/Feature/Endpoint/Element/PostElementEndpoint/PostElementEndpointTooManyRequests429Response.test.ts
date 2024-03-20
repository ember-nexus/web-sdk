import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import PostElementEndpoint from '~/Endpoint/Element/PostElementEndpoint';
import { Response429TooManyRequestsError } from '~/Error/Response429TooManyRequestsError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/a6aed16e-9a16-4ea4-953d-8a06badccec5', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/429/too-many-requests',
        title: 'Unauthorized',
        status: 429,
        detail: 'wip',
      },
      {
        status: 429,
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

test('PostElementEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const parentUuid = validateUuidFromString('a6aed16e-9a16-4ea4-953d-8a06badccec5');
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };

  await expect(Container.get(PostElementEndpoint).postElement(parentUuid, element)).to.eventually.be.rejectedWith(
    Response429TooManyRequestsError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP POST request against url http://mock-api/a6aed16e-9a16-4ea4-953d-8a06badccec5 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 429 too many requests.')).to.be.true;

  mockServer.close();
});
