import { expect } from 'chai';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementRelatedEndpoint } from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementRelatedEndpoint should throw error if page size is negative', async () => {
  const uuid = validateUuidFromString('d905b332-fee9-47d1-bcc9-a471532c8a2f');

  await expect(Container.get(GetElementRelatedEndpoint).getElementRelated(uuid, 1, -3)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page size must be at least 1.')).to.be.true;
});
