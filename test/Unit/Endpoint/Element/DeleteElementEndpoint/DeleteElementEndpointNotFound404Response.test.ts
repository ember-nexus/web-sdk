import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '../../../../../src/Endpoint/Element';
import { Response404NotFoundError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/c1978476-d672-4bd0-b8ab-c32701d56a28', () => {
    return HttpResponse.json(
      {
        type: 'http://ember-nexus-api/error/404/not-found',
        title: 'NotFound',
        status: 404,
        detail: 'Requested element was not found.',
      },
      {
        status: 404,
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
  const getDefaultDeleteOptionsSpy = sandbox.spy(fetchHelper, 'getDefaultDeleteOptions');
  const createResponseErrorFromBadResponseSpy = sandbox.spy(fetchHelper, 'createResponseErrorFromBadResponse');

  const uuid = validateUuidFromString('c1978476-d672-4bd0-b8ab-c32701d56a28');
  await expect(Container.get(DeleteElementEndpoint).deleteElement(uuid)).to.eventually.be.rejectedWith(
    Response404NotFoundError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/c1978476-d672-4bd0-b8ab-c32701d56a28 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Server returned 404 not found.')).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/c1978476-d672-4bd0-b8ab-c32701d56a28');
  expect(getDefaultDeleteOptionsSpy.calledOnce).to.be.true;
  expect(createResponseErrorFromBadResponseSpy.calledOnce).to.be.true;

  mockServer.close();
  sandbox.restore();
});
