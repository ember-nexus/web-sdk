import { expect } from 'chai';
import { Container } from 'typedi';

import { TestLogger } from '../../../TestLogger';

import { GetElementRelatedEndpoint } from '~/Endpoint/Element/GetElementRelatedEndpoint';
import { ValidationError } from '~/Error/ValidationError';
import { Logger } from '~/Service/Logger';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const testLogger: TestLogger = new TestLogger();
Container.set(Logger, testLogger);

test('GetElementRelatedEndpoint should throw error if page is negative', async () => {
  const uuid = validateUuidFromString('9dd8ca68-33fd-40c2-8b83-cc041823c71a');

  await expect(Container.get(GetElementRelatedEndpoint).getElementRelated(uuid, -3)).to.eventually.be.rejectedWith(
    ValidationError,
  );

  expect(testLogger.assertNoDebugHappened()).to.be.true;
  expect(testLogger.assertErrorHappened('Page number must be at least 1.')).to.be.true;
});
