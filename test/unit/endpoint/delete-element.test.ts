import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import deleteElement from '../../../src/endpoint/delete-element.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('deleteElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should delete an existing element from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    await deleteElement(ElementUuid.DeletableElement);

    assert.calledOnceWithExactly(debugLogger, 'Deleted element with identifier 41f4557f-0d3e-416f-a5d1-09d02433432d.');
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(deleteElement(ElementUuid.NotFoundDeletableElement)).to.be.rejectedWith(
      Error,
      'Encountered error while deleting element with identifier 7ecf787a-2c68-4817-816c-7328a7df0c2b: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while deleting element with identifier 7ecf787a-2c68-4817-816c-7328a7df0c2b: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(deleteElement(ElementUuid.ForbiddenDeletableElement)).to.be.rejectedWith(
      Error,
      'Encountered error while deleting element with identifier a0b82441-d830-44bc-8b58-a5709ca0fd32: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while deleting element with identifier a0b82441-d830-44bc-8b58-a5709ca0fd32: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
