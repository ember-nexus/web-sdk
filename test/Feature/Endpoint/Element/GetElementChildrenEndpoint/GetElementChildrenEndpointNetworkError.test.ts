import { expect } from 'chai';
import { http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementChildrenEndpoint } from '~/Endpoint/Element/GetElementChildrenEndpoint';
import { NetworkError } from '~/Error/NetworkError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const mockServer = setupServer(
  http.get('http://mock-api/206114e7-5708-426b-ba25-015d1acada72/children', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetElementChildrenEndpoint should handle network error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('206114e7-5708-426b-ba25-015d1acada72');

  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid)).to.eventually.be.rejectedWith(
    NetworkError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/206114e7-5708-426b-ba25-015d1acada72/children?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Experienced generic network error during fetching resource.')).to.be.true;

  mockServer.close();
});
