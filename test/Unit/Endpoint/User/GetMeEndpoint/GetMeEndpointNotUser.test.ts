import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetMeEndpoint } from '../../../../../src/Endpoint/User';
import { LogicError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
    return HttpResponse.json(
      {
        type: 'NotAUser',
        id: '2d376349-c5e2-42c8-8ce0-d6f525256cf7',
        data: {
          created: '2023-10-06T10:07:35+00:00',
          updated: '2023-10-06T10:07:35+00:00',
          name: 'User',
          email: 'anonymous-user@localhost.dev',
          note: 'User contains password only due to testing purposes.',
          password: '1234',
          scenario: 'general.anonymousUser',
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

test('GetMeEndpoint should throw error if returned element is not an user', async () => {
  mockServer.listen();
  await expect(Container.get(GetMeEndpoint).getMe()).to.eventually.be.rejectedWith(LogicError);

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(testLogger.assertErrorHappened("Expected node to be of type 'User'.")).to.be.true;

  mockServer.close();
});
