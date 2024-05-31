import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { DeleteElementEndpoint } from '../../../../../src/Endpoint/Element';
import { ParseError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.delete('http://mock-api/16c8ff27-0974-434a-b087-092406885bbc', () => {
    const response = HttpResponse.text('Some content which can not be interpreted as JSON.', {
      status: 200,
    });
    response.headers.delete('Content-Type');
    return response;
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('DeleteElementEndpoint should handle no content type response error', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');

  const uuid = validateUuidFromString('16c8ff27-0974-434a-b087-092406885bbc');
  await expect(Container.get(DeleteElementEndpoint).deleteElement(uuid)).to.eventually.be.rejectedWith(ParseError);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP DELETE request against url http://mock-api/16c8ff27-0974-434a-b087-092406885bbc .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Response does not contain content type header.')).to.be.true;

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/16c8ff27-0974-434a-b087-092406885bbc');

  mockServer.close();
  sandbox.restore();
});
