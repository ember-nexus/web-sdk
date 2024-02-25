import { SinonSandbox, assert, createSandbox } from 'sinon';

import DeleteElementEndpoint from '../../../src/Endpoint/DeleteElementEndpoint.js';
import Options from '../../../src/Options.js';
import testLogger from '../../testLogger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('DeleteElementEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should delete an existing element from the api without token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();

    const deleteElementEndpoint = new DeleteElementEndpoint(testLogger, options);

    await deleteElementEndpoint.deleteElement(ElementUuid.DeletableElement);

    assert.calledOnceWithExactly(debugLogger, 'Deleted element with identifier 41f4557f-0d3e-416f-a5d1-09d02433432d.');
  });

  it('should delete an existing element from the api with token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();
    options.setToken('secret-token:gRDDumwGJbb');

    const deleteElementEndpoint = new DeleteElementEndpoint(testLogger, options);

    await deleteElementEndpoint.deleteElement(ElementUuid.AuthenticatedDataNode);

    assert.calledOnceWithExactly(debugLogger, 'Deleted element with identifier 844d2d68-9cba-41c4-91b5-1dd76cc757d7.');
  });
});
