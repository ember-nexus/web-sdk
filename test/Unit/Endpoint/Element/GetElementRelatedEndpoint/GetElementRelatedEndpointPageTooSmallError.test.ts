import { expect } from 'chai';
import { Container } from 'typedi';

import { GetElementRelatedEndpoint } from '../../../../../src/Endpoint/Element';
import { ValidationError } from '../../../../../src/Error';
import { Logger } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementRelatedEndpoint should throw error if page is too small', async () => {
  const uuid = validateUuidFromString('1c6a9aa4-7b02-4406-a4e1-c3083a7792c1');

  await expect(Container.get(GetElementRelatedEndpoint).getElementRelated(uuid, 0)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
