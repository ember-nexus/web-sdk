import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementEndpoint } from '~/Endpoint/Element/GetElementEndpoint';
import { Response404NotFoundError } from '~/Error/Response404NotFoundError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const mockServer = setupServer(
  http.get('http://mock-api/2fe89dfb-ef1c-4964-99da-73161077e951', () => {
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

test('GetElementEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('2fe89dfb-ef1c-4964-99da-73161077e951');

  await expect(Container.get(GetElementEndpoint).getElement(uuid)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/2fe89dfb-ef1c-4964-99da-73161077e951 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 404 not found.')).to.be.true;

  mockServer.close();
});
