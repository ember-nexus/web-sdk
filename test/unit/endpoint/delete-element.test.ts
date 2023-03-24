import axios from 'axios';
import sinon, { SinonSandbox } from 'sinon';

import { deleteElement } from '../../../src/endpoint/delete-element.js';
import { logger } from '../../../src/logger.js';

describe('deleteElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete an existing element from the api', async () => {
    const axiosStub = sandbox.stub(axios, 'delete').resolves({
      data: null,
      status: 204,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const debugLogger = sandbox.stub(logger, 'debug');

    await deleteElement('c52569b7-1dd8-4018-9c3b-a710abd6982d');

    sinon.assert.calledOnce(axiosStub);

    sinon.assert.calledOnceWithExactly(
      debugLogger,
      'Deleted element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
    );
  });
});
