import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import getParents from '../../../src/endpoint/get-parents.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('getParents tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should load existing elements from the api', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const resultPartialCollection = await getParents(ElementUuid.ChildWithParents).then((partialCollection) => {
      return partialCollection;
    });

    const collection = {
      type: '_PartialCollection',
      id: '/70d1e8a6-58a7-4a24-b05a-5552e035c8dc/parents?page=1&pageSize=25',
      totalNodes: 2,
      links: {
        first: '/70d1e8a6-58a7-4a24-b05a-5552e035c8dc/parents?page=1&pageSize=25',
        previous: null,
        next: null,
        last: '/70d1e8a6-58a7-4a24-b05a-5552e035c8dc/parents?page=1&pageSize=25',
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
      relations: [
        {
          type: 'OWNS',
          id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
          start: '81771a82-b82b-407a-a7a6-ceec5835f260',
          end: '70d1e8a6-58a7-4a24-b05a-5552e035c8dc',
          data: {
            some: 'data',
          },
        },
        {
          type: 'OWNS',
          id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
          start: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          end: '70d1e8a6-58a7-4a24-b05a-5552e035c8dc',
          data: {
            some: 'data',
          },
        },
      ],
    };

    expect(resultPartialCollection).to.eql(collection);

    assert.calledOnceWithExactly(
      debugLogger,
      'Loaded parents from child with identifier 70d1e8a6-58a7-4a24-b05a-5552e035c8dc.',
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
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getParents(ElementUuid.NotFoundChildWithParents)).to.be.rejectedWith(
      Error,
      'Encountered error while loading parents from child with identifier 6a7d5759-b977-4dd5-ad3b-5fbf975696c8: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading parents from child with identifier 6a7d5759-b977-4dd5-ad3b-5fbf975696c8: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getParents(ElementUuid.ForbiddenChildWithParents)).to.be.rejectedWith(
      Error,
      'Encountered error while loading parents from child with identifier e823cadf-bf8d-4719-a2d5-807462e1fcd7: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading parents from child with identifier e823cadf-bf8d-4719-a2d5-807462e1fcd7: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
