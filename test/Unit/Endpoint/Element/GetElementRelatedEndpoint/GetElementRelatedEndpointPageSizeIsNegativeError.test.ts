import { expect } from 'chai';
import { Container } from 'typedi';

import { GetElementRelatedEndpoint } from '../../../../../src/Endpoint/Element';
import { ValidationError } from '../../../../../src/Error';
import { Logger } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

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
