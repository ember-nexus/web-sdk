import axios from 'axios';
import sinon, { SinonSandbox } from 'sinon';

import { patchElement } from '../../../src/endpoint/patch-element.js';
import { logger } from '../../../src/logger.js';

describe('patchElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should patch an existing element from the api', async () => {
    sandbox.stub(axios, 'patch').resolves({
      data: null,
      status: 204,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const debugLogger = sandbox.stub(logger, 'debug');

    await patchElement('c52569b7-1dd8-4018-9c3b-a710abd6982d', { some: 'data' });

    sinon.assert.calledOnceWithExactly(
      debugLogger,
      'Patched element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      {
        some: 'data',
      },
    );
  });
});
