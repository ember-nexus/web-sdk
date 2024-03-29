import { expect } from 'chai';
import { Container } from 'typedi';

import { GetIndexEndpoint } from '~/Endpoint/Element/GetIndexEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';

import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetIndexEndpoint should throw error if page is too small', async () => {
  await expect(Container.get(GetIndexEndpoint).getIndex(0)).to.eventually.be.rejectedWith(ValidationError);

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
