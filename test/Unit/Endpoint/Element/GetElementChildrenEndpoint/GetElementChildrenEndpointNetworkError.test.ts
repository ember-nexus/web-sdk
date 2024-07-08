import { expect } from 'chai';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '../../../../../src/Endpoint/Element';
import { NetworkError } from '../../../../../src/Error';
import { FetchHelper, Logger, WebSdkConfiguration } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/206114e7-5708-426b-ba25-015d1acada72/children', () => {
    return Response.error();
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetElementChildrenEndpoint should handle network error', async () => {
  const sandbox = createSandbox();
  mockServer.listen();
  const fetchHelper = Container.get(FetchHelper);
  const buildUrlSpy = sandbox.spy(fetchHelper, 'buildUrl');
  const getDefaultGetOptionsSpy = sandbox.spy(fetchHelper, 'getDefaultGetOptions');

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

  expect(buildUrlSpy.calledOnce).to.be.true;
  expect(buildUrlSpy.getCall(0).args[0]).to.equal('/206114e7-5708-426b-ba25-015d1acada72/children?page=1&pageSize=25');
  expect(getDefaultGetOptionsSpy.calledOnce).to.be.true;

  mockServer.close();
  sandbox.restore();
});
