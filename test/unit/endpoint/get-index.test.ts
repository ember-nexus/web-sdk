import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import getIndex from '../../../src/endpoint/get-index.js';
import logger from '../../../src/logger.js';
import server from '../msw-mock/server.js';

describe('getIndex tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should load existing elements from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const resultPartialCollection = await getIndex().then((partialCollection) => {
      return partialCollection;
    });

    const collection = {
      type: '_PartialCollection',
      id: '/?page=1&pageSize=25',
      totalNodes: 2,
      links: {
        first: '/?page=1&pageSize=25',
        previous: null,
        next: null,
        last: '/?page=1&pageSize=25',
      },
      nodes: [
        {
          type: 'Node',
          id: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {
            some: 'data',
          },
        },
        {
          type: 'Node',
          id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {
            some: 'data',
          },
        },
      ],
      relations: [],
    };

    expect(resultPartialCollection).to.eql(collection);

    sinon.assert.calledOnceWithExactly(debugLogger, 'Loaded index.', {
      page: 1,
      pageSize: 25,
      collection: collection,
    });
  });

  it.skip('should throw detailed error when content is malformed', async () => {
    // todo implement test in future
  });

  it.skip('should throw detailed error when element is not found', async () => {
    // todo implement test in future?
  });

  it.skip('should throw detailed error when element is forbidden', async () => {
    // todo implement test in future?
  });
});
