import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '../../../../../src/Endpoint/Element';
import { Response401UnauthorizedError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/e2747c35-3882-49a9-9705-efe872500a43/children', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/401/unauthorized',
        title: 'Unauthorized',
        status: 401,
        detail:
          "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
      },
      {
        status: 401,
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

test('GetElementChildrenEndpoint should handle bad response error', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');
  const getDefaultGetOptionsSpy = sandbox.spy(fetchHelper, 'getDefaultGetOptions');
  const createResponseErrorFromBadResponseSpy = sandbox.spy(fetchHelper, 'createResponseErrorFromBadResponse');

  const uuid = validateUuidFromString('e2747c35-3882-49a9-9705-efe872500a43');
  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid)).to.eventually.be.rejectedWith(
    Response401UnauthorizedError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/e2747c35-3882-49a9-9705-efe872500a43/children?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 401 unauthorized.')).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/e2747c35-3882-49a9-9705-efe872500a43/children?page=1&pageSize=25');
  expect(getDefaultGetOptionsSpy.calledOnce).to.be.true;
  expect(createResponseErrorFromBadResponseSpy.calledOnce).to.be.true;

  mockServer.close();
  sandbox.restore();
});
