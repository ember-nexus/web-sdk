import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import patchElement from '../../../src/endpoint/patch-element.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('patchElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should patch an existing element from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    await patchElement(ElementUuid.PatchableElement, { some: 'data' });

    assert.calledOnceWithExactly(debugLogger, 'Patched element with identifier f6b65db1-ab01-40b2-9adf-cf32ce4c7c92.', {
      some: 'data',
    });
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(patchElement(ElementUuid.NotFoundPatchableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while patching element with identifier 88e08c26-709e-49d6-b8cc-99662c42f692: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while patching element with identifier 88e08c26-709e-49d6-b8cc-99662c42f692: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(patchElement(ElementUuid.ForbiddenPatchableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while patching element with identifier ed8415c9-8c27-4869-9832-44e94c6eb127: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while patching element with identifier ed8415c9-8c27-4869-9832-44e94c6eb127: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
