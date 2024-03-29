import { expect } from 'chai';
import { Container } from 'typedi';

import { GetElementChildrenEndpoint } from '~/Endpoint/Element/GetElementChildrenEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementChildrenEndpoint should throw error if page is negative', async () => {
  const uuid = validateUuidFromString('07212e8a-14cc-4f45-a3e9-1179080bbd61');

  await expect(Container.get(GetElementChildrenEndpoint).getElementChildren(uuid, -3)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
