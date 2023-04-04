import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import putElement from '../../../src/endpoint/put-element.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('putElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should replace data of an existing element from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    await putElement(ElementUuid.UpdateableElement, { some: 'data' });

    sinon.assert.calledOnceWithExactly(
      debugLogger,
      'Replaced data of element with identifier 360cfa23-86f0-4673-82e3-5b0b091814ec.',
      {
        some: 'data',
      },
    );
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(putElement(ElementUuid.NotFoundUpdateableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while updating element with identifier 7e8ff369-9f5c-4c9f-8343-5dc3498b650c: Not Found - The requested resource was not found.',
    );

    sinon.assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while updating element with identifier 7e8ff369-9f5c-4c9f-8343-5dc3498b650c: Not Found - The requested resource was not found.',
      sinon.match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(putElement(ElementUuid.ForbiddenUpdateableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while updating element with identifier a0e5a97a-ac9a-4a96-921b-549df4a92e46: Forbidden - Client does not have permissions to perform action.',
    );

    sinon.assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while updating element with identifier a0e5a97a-ac9a-4a96-921b-549df4a92e46: Forbidden - Client does not have permissions to perform action.',
      sinon.match.any,
    );
  });
});
