import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetTokenEndpoint } from '../../../../../src/Endpoint/User';
import { LogicError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/token', () => {
    return HttpResponse.json(
      {
        type: 'NotAToken',
        id: '7040618a-f73f-4468-ab54-1da8dee5a551',
        data: {
          created: '2023-12-10T14:34:21+00:00',
          updated: '2023-12-10T14:34:21+00:00',
          state: 'ACTIVE',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetTokenEndpoint should throw error if returned element is not a token', async () => {
  mockServer.listen();
  await expect(Container.get(GetTokenEndpoint).getToken()).to.eventually.be.rejectedWith(LogicError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/token .')).to.be.true;

  expect(testLogger.assertErrorHappened("Expected node to be of type 'Token'.")).to.be.true;

  mockServer.close();
});
