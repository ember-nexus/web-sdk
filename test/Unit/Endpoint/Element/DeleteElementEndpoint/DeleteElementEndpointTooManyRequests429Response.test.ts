import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '../../../../../src/Endpoint/Element';
import { Response429TooManyRequestsError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/c653fae2-7f18-4bc9-abfb-929e60b57d72', () => {
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

test('DeleteElementEndpoint should handle bad response error', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');

  const uuid = validateUuidFromString('c653fae2-7f18-4bc9-abfb-929e60b57d72');
  await expect(Container.get(DeleteElementEndpoint).deleteElement(uuid)).to.eventually.be.rejectedWith(
    Response429TooManyRequestsError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/c653fae2-7f18-4bc9-abfb-929e60b57d72 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Sever returned 429 too many requests.')).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/c653fae2-7f18-4bc9-abfb-929e60b57d72');

  mockServer.close();
  sandbox.restore();
});
