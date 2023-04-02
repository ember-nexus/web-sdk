import axios from 'axios';
import sinon, { SinonSandbox } from 'sinon';

import { putElement } from '../../../src/endpoint/put-element.js';
import { logger } from '../../../src/logger.js';

describe('putElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should replace data of an existing element from the api', async () => {
    sandbox.stub(axios, 'put').resolves({
      data: null,
      status: 204,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const debugLogger = sandbox.stub(logger, 'debug');

    await putElement('c52569b7-1dd8-4018-9c3b-a710abd6982d', { some: 'data' });

    sinon.assert.calledOnceWithExactly(
      debugLogger,
      'Replaced element data with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      {
        some: 'data',
      },
    );
  });
});
