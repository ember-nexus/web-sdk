import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { PutElementEndpoint } from '~/Endpoint/Element/PutElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Data } from '~/Type/Definition/Data';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const mockServer = setupServer(
  http.put('http://mock-api/7156f0af-53ce-4025-937a-9d7abc76a1a8', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
);

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);
Container.get(WebSdkConfiguration).setApiHost('http://mock-api');

test('PutElementEndpoint should handle 204 response', async () => {
  mockServer.listen();
  const uuid = validateUuidFromString('7156f0af-53ce-4025-937a-9d7abc76a1a8');
  const data: Data = {
    new: 'Data',
  };
  await Container.get(PutElementEndpoint).putElement(uuid, data);

  expect(
    testLogger.assertDebugHappened(
      'Executing HTTP PUT request against url http://mock-api/7156f0af-53ce-4025-937a-9d7abc76a1a8 .',
    ),
  ).to.be.true;

  mockServer.close();
});
