import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox } from 'sinon';

import GetIndexEndpoint from '../../../src/Endpoint/GetIndexEndpoint.js';
import Options from '../../../src/Options.js';
import testLogger from '../../testLogger.js';
import server from '../msw-mock/server.js';

describe('GetIndexEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should load existing elements from the api without token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();

    const getIndexEndpoint = new GetIndexEndpoint(testLogger, options);

    const resultPartialCollection = await getIndexEndpoint.getIndex().then((partialCollection) => {
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

    assert.calledOnceWithExactly(debugLogger, 'Loaded index.', {
      page: 1,
      pageSize: 25,
      collection: collection,
    });
  });

  it('should load existing elements from the api with token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();
    options.setToken('secret-token:gRDDumwGJbb');

    const getIndexEndpoint = new GetIndexEndpoint(testLogger, options);

    const resultPartialCollection = await getIndexEndpoint.getIndex().then((partialCollection) => {
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

    assert.calledOnceWithExactly(debugLogger, 'Loaded index.', {
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
