import { expect } from 'chai';
import { http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetMeEndpoint } from '~/Endpoint/User/GetMeEndpoint';
import { NetworkError } from '~/Error/NetworkError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetMeEndpoint should handle network error', async () => {
  mockServer.listen();
  await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejectedWith(NetworkError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during fetching resource.')).to.be.true;

  mockServer.close();
});
