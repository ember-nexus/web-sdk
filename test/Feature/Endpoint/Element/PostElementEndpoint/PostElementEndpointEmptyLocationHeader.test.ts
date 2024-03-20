import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import PostElementEndpoint from '~/Endpoint/Element/PostElementEndpoint';
import { ParseError } from '~/Error/ParseError';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const mockServer = setupServer(
  http.post('http://mock-api/377e1156-070d-4b35-86d0-738f455c1d07', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        Location: '',
      },
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PostElementEndpoint should handle 204 response with empty location header', async () => {
  mockServer.listen();
  const parentUuid = validateUuidFromString('377e1156-070d-4b35-86d0-738f455c1d07');
  const element: NodeWithOptionalId = {
    type: 'Data',
    data: {
      hello: 'world',
    },
  };
  await expect(Container.get(PostElementEndpoint).postElement(parentUuid, element)).to.eventually.be.rejectedWith(
    ParseError,
  );

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP POST request against url http://mock-api/377e1156-070d-4b35-86d0-738f455c1d07 .',
    ),
  ).to.be.true;

  expect(testLogger.assertErrorHappened('Passed variable is not a valid UUID v4.')).to.be.true;

  mockServer.close();
});
