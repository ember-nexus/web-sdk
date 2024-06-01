import { expect } from 'chai';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '../../../../../src/Endpoint/Element';
import { ValidationError } from '../../../../../src/Error';
import { Logger } from '../../../../../src/Service';
import { validateUuidFromString } from '../../../../../src/Type/Definition';
import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementChildrenEndpoint should throw error if page is too small', async () => {
  const uuid = validateUuidFromString('07212e8a-14cc-4f45-a3e9-1179080bbd61');

  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid, 0)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
