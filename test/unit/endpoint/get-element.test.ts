import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon, { SinonSandbox } from 'sinon';

import { getElement } from '../../../src/endpoint/get-element.js';
import { logger } from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import { server } from '../msw-mock/server.js';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  after(() => {
    server.close();
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

    sinon.assert.calledOnceWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      {
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      },
    );
  });

  it('should throw detailed error when content is malformed', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.MalformedDataNode)).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'type'",
    );

    const expectedErr = sinon.match
      .instanceOf(Error)
      .and(
        sinon.match.has(
          'message',
          "Encountered error while loading element with identifier a770f244-d2fc-4a32-8aa5-d8c9204e2f01: Data object does not contain property with name 'type'.",
        ),
      );
    sinon.assert.calledOnceWithExactly(errorLogger, sinon.match(expectedErr));
  });

  it('should throw error when element is not found', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.NotFoundElement)).to.be.rejectedWith(
      Error,
      'Request failed with status code 404',
    );

    sinon.assert.calledOnceWithExactly(errorLogger, 'Request failed with status code 404', sinon.match.any);
  });

  it('should throw error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement(ElementUuid.ForbiddenElement)).to.be.rejectedWith(
      Error,
      'Request failed with status code 403',
    );

    sinon.assert.calledOnceWithExactly(errorLogger, 'Request failed with status code 403', sinon.match.any);
  });
});
