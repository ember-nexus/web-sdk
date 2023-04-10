import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import PutElementEndpoint from '../../../src/Endpoint/PutElementEndpoint.js';
import Options from '../../../src/Options.js';
import testLogger from '../../testLogger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('PutElementEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should replace data of an existing element from the api', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();

    const putElementEndpoint = new PutElementEndpoint(testLogger, options);

    await putElementEndpoint.putElement(ElementUuid.UpdateableElement, { some: 'data' });

    assert.calledOnceWithExactly(
      debugLogger,
      'Replaced data of element with identifier 360cfa23-86f0-4673-82e3-5b0b091814ec.',
      {
        some: 'data',
      },
    );
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const putElementEndpoint = new PutElementEndpoint(testLogger, options);

    await expect(putElementEndpoint.putElement(ElementUuid.NotFoundUpdateableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while updating element with identifier 7e8ff369-9f5c-4c9f-8343-5dc3498b650c: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while updating element with identifier 7e8ff369-9f5c-4c9f-8343-5dc3498b650c: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const putElementEndpoint = new PutElementEndpoint(testLogger, options);

    await expect(putElementEndpoint.putElement(ElementUuid.ForbiddenUpdateableElement, {})).to.be.rejectedWith(
      Error,
      'Encountered error while updating element with identifier a0e5a97a-ac9a-4a96-921b-549df4a92e46: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while updating element with identifier a0e5a97a-ac9a-4a96-921b-549df4a92e46: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
