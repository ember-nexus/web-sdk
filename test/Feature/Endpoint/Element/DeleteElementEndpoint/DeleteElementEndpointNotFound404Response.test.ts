import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import DeleteElementEndpoint from '~/Endpoint/Element/DeleteElementEndpoint';
import { Response404NotFoundError } from '~/Error/Response404NotFoundError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/c1978476-d672-4bd0-b8ab-c32701d56a28', () => {
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

test('DeleteElementEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('c1978476-d672-4bd0-b8ab-c32701d56a28');

  await expect(Container.get(DeleteElementEndpoint).deleteElement(uuid)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/c1978476-d672-4bd0-b8ab-c32701d56a28 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 404 not found.')).to.be.true;

  mockServer.close();
});
