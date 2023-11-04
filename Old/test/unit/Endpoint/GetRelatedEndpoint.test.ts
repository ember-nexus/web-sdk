import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import GetRelatedEndpoint from '../../../src/Endpoint/GetRelatedEndpoint.js';
import Options from '../../../src/Options.js';
import testLogger from '../../testLogger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('GetRelatedEndpoint tests', () => {
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

    const getRelatedEndpoint = new GetRelatedEndpoint(testLogger, options);

    const resultPartialCollection = await getRelatedEndpoint
      .getRelated(ElementUuid.ElementWithRelatedElements)
      .then((partialCollection) => {
        return partialCollection;
      });

    const collection = {
      type: '_PartialCollection',
      id: '/c7fab8e1-5d32-4887-b466-2a7581d8a43b/related?page=1&pageSize=25',
      totalNodes: 4,
      links: {
        first: '/c7fab8e1-5d32-4887-b466-2a7581d8a43b/related?page=1&pageSize=25',
        previous: null,
        next: null,
        last: '/c7fab8e1-5d32-4887-b466-2a7581d8a43b/related?page=1&pageSize=25',
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
        {
          type: 'Node',
          id: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
          data: {
            some: 'data',
          },
        },
        {
          type: 'Node',
          id: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
          data: {
            some: 'data',
          },
        },
      ],
      relations: [
        {
          type: 'OWNS',
          id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
          start: 'c7fab8e1-5d32-4887-b466-2a7581d8a43b',
          end: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {},
        },
        {
          type: 'OWNS',
          id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
          start: 'c7fab8e1-5d32-4887-b466-2a7581d8a43b',
          end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {},
        },
        {
          type: 'OWNS',
          id: 'd1021ce6-ae51-48a1-a96b-25d93a1c3d8d',
          start: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
          end: 'c7fab8e1-5d32-4887-b466-2a7581d8a43b',
          data: {},
        },
        {
          type: 'TAGGED',
          id: '1cd96b0a-9a0e-4c4c-b946-dc9ca81dfae3',
          start: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
          end: 'c7fab8e1-5d32-4887-b466-2a7581d8a43b',
          data: {},
        },
      ],
    };

    expect(resultPartialCollection).to.eql(collection);

    assert.calledOnceWithExactly(
      debugLogger,
      'Loaded related elements to node with identifier c7fab8e1-5d32-4887-b466-2a7581d8a43b.',
      {
        page: 1,
        pageSize: 25,
        collection: collection,
      },
    );
  });

  it('should load existing elements from the api with token', async () => {
    const debugLogger = sandbox.stub(testLogger, 'debug');
    const options = new Options();
    options.setToken('secret-token:gRDDumwGJbb');

    const getRelatedEndpoint = new GetRelatedEndpoint(testLogger, options);

    const resultPartialCollection = await getRelatedEndpoint
      .getRelated(ElementUuid.AuthenticatedDataNode)
      .then((partialCollection) => {
        return partialCollection;
      });

    const collection = {
      type: '_PartialCollection',
      id: '/844d2d68-9cba-41c4-91b5-1dd76cc757d7/related?page=1&pageSize=25',
      totalNodes: 4,
      links: {
        first: '/844d2d68-9cba-41c4-91b5-1dd76cc757d7/related?page=1&pageSize=25',
        previous: null,
        next: null,
        last: '/844d2d68-9cba-41c4-91b5-1dd76cc757d7/related?page=1&pageSize=25',
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
        {
          type: 'Node',
          id: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
          data: {
            some: 'data',
          },
        },
        {
          type: 'Node',
          id: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
          data: {
            some: 'data',
          },
        },
      ],
      relations: [
        {
          type: 'OWNS',
          id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
          start: '844d2d68-9cba-41c4-91b5-1dd76cc757d7',
          end: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {},
        },
        {
          type: 'OWNS',
          id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
          start: '844d2d68-9cba-41c4-91b5-1dd76cc757d7',
          end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {},
        },
        {
          type: 'OWNS',
          id: 'd1021ce6-ae51-48a1-a96b-25d93a1c3d8d',
          start: '3138a423-0e4e-4c25-a707-4b1ec3a154f4',
          end: '844d2d68-9cba-41c4-91b5-1dd76cc757d7',
          data: {},
        },
        {
          type: 'TAGGED',
          id: '1cd96b0a-9a0e-4c4c-b946-dc9ca81dfae3',
          start: 'c60b8b6b-d0dc-467f-b5f0-9458f115ba1e',
          end: '844d2d68-9cba-41c4-91b5-1dd76cc757d7',
          data: {},
        },
      ],
    };

    expect(resultPartialCollection).to.eql(collection);

    assert.calledOnceWithExactly(
      debugLogger,
      'Loaded related elements to node with identifier 844d2d68-9cba-41c4-91b5-1dd76cc757d7.',
      {
        page: 1,
        pageSize: 25,
        collection: collection,
      },
    );
  });

  it.skip('should throw detailed error when content is malformed', async () => {
    // todo implement test in future
  });

  it('should throw detailed error when element is not found', async () => {
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const getRelatedEndpoint = new GetRelatedEndpoint(testLogger, options);

    await expect(getRelatedEndpoint.getRelated(ElementUuid.NotFoundElementWithRelatedElements)).to.be.rejectedWith(
      Error,
      'Encountered error while loading related elements from element with identifier 1740a1b5-0e93-4f25-9fed-d3e54081d359: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading related elements from element with identifier 1740a1b5-0e93-4f25-9fed-d3e54081d359: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(testLogger, 'error');
    const options = new Options();

    const getRelatedEndpoint = new GetRelatedEndpoint(testLogger, options);

    await expect(getRelatedEndpoint.getRelated(ElementUuid.ForbiddenElementWithRelatedElements)).to.be.rejectedWith(
      Error,
      'Encountered error while loading related elements from element with identifier 68c1c83e-0b44-4340-b04b-c50eff55d08f: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading related elements from element with identifier 68c1c83e-0b44-4340-b04b-c50eff55d08f: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
