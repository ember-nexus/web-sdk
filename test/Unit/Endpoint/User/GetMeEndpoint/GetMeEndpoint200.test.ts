import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetMeEndpoint } from '../../../../../src/Endpoint/User';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/me', () => {
    return HttpResponse.json(
      {
        type: 'User',
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

test('GetMeEndpoint should handle node response', async () => {
  mockServer.listen();
  const node = await Container.get(GetMeEndpoint).getMe();

  expect(testLogger.assertDebugHappened('Executing HTTP GET request against url http://mock-api/me .')).to.be.true;

  expect(node).to.have.keys('id', 'type', 'data');
  expect(node).to.not.have.keys('start', 'end');
  expect(node.type).to.equal('User');
  expect(node.data.created).to.be.instanceof(Date);
  expect(node.data.updated).to.be.instanceof(Date);
  expect(Object.keys(node.data)).to.have.lengthOf(7);

  mockServer.close();
});
