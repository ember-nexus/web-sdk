import { expect } from 'chai';
import { Container } from 'typedi';

import { GetIndexEndpoint } from '../../../../../src/Endpoint/Element';
import { ValidationError } from '../../../../../src/Error';
import { Logger } from '../../../../../src/Service';
import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetIndexEndpoint should throw error if page size is negative', async () => {
  await expect(Container.get(GetIndexEndpoint).getIndex(1, -3)).to.eventually.be.rejectedWith(ValidationError);

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page size must be at least 1.')).to.be.true;
});
