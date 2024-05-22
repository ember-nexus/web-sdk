import { expect } from 'chai';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementParentsEndpoint } from '~/Endpoint/Element/GetElementParentsEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementParentsEndpoint should throw error if page is too small', async () => {
  const uuid = validateUuidFromString('057c1458-af8d-40bb-af42-9d9dae97ed22');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid, 0)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
