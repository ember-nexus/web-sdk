import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { DeleteTokenEndpoint } from '~/Endpoint/User/DeleteTokenEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/token', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('DeleteTokenEndpoint should handle 204 response', async () => {
  mockServer.listen();
  await Container.get(DeleteTokenEndpoint).deleteToken();

  expect(testLogger.assertDebugHappened('Executing HTTP DELETE request against url http://mock-api/token .')).to.be
    .true;

  mockServer.close();
});
