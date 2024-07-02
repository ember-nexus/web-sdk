import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetElementParentsEndpoint } from '../../../../../src/Endpoint/Element';
import { Response429TooManyRequestsError } from '../../../../../src/Error';
import { Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/b1a69500-c37d-4125-a2bc-106a2eab6ddb/parents', () => {
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

test('GetElementParentsEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('b1a69500-c37d-4125-a2bc-106a2eab6ddb');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid)).to.eventually.be.rejectedWith(
    Response429TooManyRequestsError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/b1a69500-c37d-4125-a2bc-106a2eab6ddb/parents?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 429 too many requests.')).to.be.true;

  mockServer.close();
});
