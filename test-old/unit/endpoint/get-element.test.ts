import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import getElement from '../../../src/endpoint/get-element.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('getElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should load an existing element from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const resultNode = await getElement(ElementUuid.DataNode).then((node) => {
      return node;
    });

    expect(resultNode).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });

    assert.calledOnceWithExactly(debugLogger, 'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.', {
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
  });

  it('should throw detailed error when content is malformed', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.MalformedDataNode)).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'type'",
    );

    const expectedErr = match
      .instanceOf(Error)
      .and(
        match.has(
          'message',
          "Encountered error while loading element with identifier a770f244-d2fc-4a32-8aa5-d8c9204e2f01: Data object does not contain property with name 'type'.",
        ),
      );
    assert.calledOnceWithExactly(errorLogger, match(expectedErr));
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.NotFoundElement)).to.be.rejectedWith(
      Error,
      'Encountered error while loading element with identifier ca443647-e292-4f2b-838f-95f24a60ea02: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading element with identifier ca443647-e292-4f2b-838f-95f24a60ea02: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.ForbiddenElement)).to.be.rejectedWith(
      Error,
      'Encountered error while loading element with identifier ab6b0bbb-1523-44d8-9d8a-af4d630fa7ed: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading element with identifier ab6b0bbb-1523-44d8-9d8a-af4d630fa7ed: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
