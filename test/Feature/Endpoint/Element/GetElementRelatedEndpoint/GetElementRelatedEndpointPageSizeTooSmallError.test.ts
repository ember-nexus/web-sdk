import { expect } from 'chai';
import { Container } from 'typedi';

import GetElementRelatedEndpoint from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementRelatedEndpoint should throw error if page size is too small', async () => {
  const uuid = validateUuidFromString('bcfbc37f-ac59-4b8b-9782-db4b30104cbc');

  await expect(Container.get(GetElementRelatedEndpoint).getElementRelated(uuid, 1, 0)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page size must be at least 1.')).to.be.true;
});
