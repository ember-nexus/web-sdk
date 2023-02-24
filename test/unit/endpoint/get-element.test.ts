import { getElement } from '../../../src/endpoint/get-element.js';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import axios from 'axios';
import { logger } from '../../../src/logger.js';

describe('getElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should load an existing element from the api', async () => {
    sandbox.stub(axios, 'get').resolves({
      data: {
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const debugLogger = sandbox.stub(logger, 'debug');

    const resultNode = await getElement('c52569b7-1dd8-4018-9c3b-a710abd6982d').then((node) => {
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
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d',
      {
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      },
    );
  });

  it('should pass error when content is malformed', async () => {
    sandbox.stub(axios, 'get').resolves({
      data: {
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getElement('c52569b7-1dd8-4018-9c3b-a710abd6982d')).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'type'",
    );

    const expectedErr = sinon.match
      .instanceOf(Error)
      .and(sinon.match.has('message', "Data object does not contain property with name 'type'"));
    sinon.assert.calledOnceWithExactly(errorLogger, sinon.match(expectedErr));
  });
});
