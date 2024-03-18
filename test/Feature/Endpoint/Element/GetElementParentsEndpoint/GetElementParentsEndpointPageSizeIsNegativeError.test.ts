import { expect } from 'chai';
import { Container } from 'typedi';

import GetElementParentsEndpoint from '~/Endpoint/Element/GetElementParentsEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementParentsEndpoint should throw error if page size is negative', async () => {
  const uuid = validateUuidFromString('2f9cb4cd-6374-4126-b13f-0a75165970cb');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid, 1, -3)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page size must be at least 1.')).to.be.true;
});
