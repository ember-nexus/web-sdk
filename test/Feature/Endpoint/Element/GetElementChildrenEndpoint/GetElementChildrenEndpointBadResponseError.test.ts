import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '~/Endpoint/Element/GetElementChildrenEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.get('http://mock-api/246f216a-7fee-472c-8009-a31636f403aa/children', () => {
    return HttpResponse.text('Some content which can not be interpreted as JSON.', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('GetElementChildrenEndpoint should handle bad response error', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('246f216a-7fee-472c-8009-a31636f403aa');

  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid)).to.eventually.be.rejectedWith(
    ParseError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP GET request against url http://mock-api/246f216a-7fee-472c-8009-a31636f403aa/children?page=1&pageSize=25 .',
    ),
  ).to.be.true;

  expect(
    testLogger.assertErrorHappened(
      "Unable to parse response as content type is neither 'application/json' nor 'application/problem+json'.",
    ),
  ).to.be.true;

  mockServer.close();
});
