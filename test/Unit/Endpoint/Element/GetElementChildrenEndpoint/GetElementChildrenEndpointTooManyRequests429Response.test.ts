import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '../../../../../src/Endpoint/Element';
import { Response429TooManyRequestsError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/7d68afe8-8c1c-40a9-9700-677e1a460623/children', () => {
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

test('GetElementChildrenEndpoint should handle bad response error', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');
  const getDefaultGetOptionsSpy = sandbox.spy(fetchHelper, 'getDefaultGetOptions');
  const createResponseErrorFromBadResponseSpy = sandbox.spy(fetchHelper, 'createResponseErrorFromBadResponse');

  const uuid = validateUuidFromString('7d68afe8-8c1c-40a9-9700-677e1a460623');
  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid)).to.eventually.be.rejectedWith(
    Response429TooManyRequestsError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/7d68afe8-8c1c-40a9-9700-677e1a460623/children?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 429 too many requests.')).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/7d68afe8-8c1c-40a9-9700-677e1a460623/children?page=1&pageSize=25');
  expect(getDefaultGetOptionsSpy.calledOnce).to.be.true;
  expect(createResponseErrorFromBadResponseSpy.calledOnce).to.be.true;

  mockServer.close();
  sandbox.restore();
});
