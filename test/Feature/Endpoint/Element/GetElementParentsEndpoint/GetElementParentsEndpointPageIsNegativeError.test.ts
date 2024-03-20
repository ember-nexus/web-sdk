import { expect } from 'chai';
import { Container } from 'typedi';

import GetElementParentsEndpoint from '~/Endpoint/Element/GetElementParentsEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { TestLogger } from '../../../TestLogger';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementParentsEndpoint should throw error if page is negative', async () => {
  const uuid = validateUuidFromString('1661518d-0474-4955-9930-44bd565e0955');

  await expect(Container.get(GetElementParentsEndpoint).getElementParents(uuid, -3)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
