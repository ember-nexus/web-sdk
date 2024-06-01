import { expect } from 'chai';
import { Container } from 'typedi';

import { GetElementRelatedEndpoint } from '../../../../../src/Endpoint/Element';
import { ValidationError } from '../../../../../src/Error';
import { Logger } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
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
