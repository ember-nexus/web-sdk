import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import getChildren from '../../../src/endpoint/get-children.js';
import logger from '../../../src/logger.js';
import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';

describe('getChildren tests', () => {
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

    const resultPartialCollection = await getChildren(ElementUuid.ParentWithChildren).then((partialCollection) => {
      return partialCollection;
    });

    const collection = {
      type: '_PartialCollection',
      id: '/8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2/children?page=1&pageSize=25',
      totalNodes: 2,
      links: {
        first: '/8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2/children?page=1&pageSize=25',
        last: '/8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2/children?page=1&pageSize=25',
        next: null,
        previous: null,
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
          start: '8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2',
          end: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {},
        },
        {
          type: 'OWNS',
          id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
          start: '8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2',
          end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {},
        },
      ],
    };

    expect(resultPartialCollection).to.eql(collection);

    assert.calledOnceWithExactly(
      debugLogger,
      'Loaded children from parent with identifier 8ea07cfe-a99f-4daa-b8e4-39d59adc9ed2.',
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

    await expect(getChildren(ElementUuid.NotFoundParentWithChildren)).to.be.rejectedWith(
      Error,
      'Encountered error while loading children from parent with identifier 44402423-4305-4eab-b139-c363e8bd6b98: Not Found - The requested resource was not found.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading children from parent with identifier 44402423-4305-4eab-b139-c363e8bd6b98: Not Found - The requested resource was not found.',
      match.any,
    );
  });

  it('should throw detailed error when element is forbidden', async () => {
    const errorLogger = sandbox.stub(logger, 'error');

    await expect(getChildren(ElementUuid.ForbiddenParentWithChildren)).to.be.rejectedWith(
      Error,
      'Encountered error while loading children from parent with identifier 36ae7d79-49e3-41a3-841c-424dc1706d9e: Forbidden - Client does not have permissions to perform action.',
    );

    assert.calledOnceWithExactly(
      errorLogger,
      'Encountered error while loading children from parent with identifier 36ae7d79-49e3-41a3-841c-424dc1706d9e: Forbidden - Client does not have permissions to perform action.',
      match.any,
    );
  });
});
