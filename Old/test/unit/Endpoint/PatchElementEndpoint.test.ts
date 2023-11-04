import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import PatchElementEndpoint from '../../../src/Endpoint/PatchElementEndpoint.js';
import Options from '../../../src/Options.js';
import testLogger from '../../testLogger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('PatchElementEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should patch an existing element from the api without token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();

    const patchElementEndpoint = new PatchElementEndpoint(testLogger, options);

    await patchElementEndpoint.patchElement(ElementUuid.PatchableElement, { some: 'data' });

    assert.calledOnceWithExactly(debugLogger, 'Patched element with identifier f6b65db1-ab01-40b2-9adf-cf32ce4c7c92.', {
      some: 'data',
    });
  });

  it('should patch an existing element from the api with token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();
    options.setToken('secret-token:gRDDumwGJbb');

    const patchElementEndpoint = new PatchElementEndpoint(testLogger, options);

    await patchElementEndpoint.patchElement(ElementUuid.AuthenticatedDataNode, { some: 'data' });

    assert.calledOnceWithExactly(debugLogger, 'Patched element with identifier 844d2d68-9cba-41c4-91b5-1dd76cc757d7.', {
      some: 'data',
    });
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const patchElementEndpoint = new PatchElementEndpoint(testLogger, options);

    await expect(patchElementEndpoint.patchElement(ElementUuid.NotFoundPatchableElement, {})).to.be.rejectedWith(
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
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const patchElementEndpoint = new PatchElementEndpoint(testLogger, options);

    await expect(patchElementEndpoint.patchElement(ElementUuid.ForbiddenPatchableElement, {})).to.be.rejectedWith(
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
