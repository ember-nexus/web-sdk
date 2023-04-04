import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const parentsHandler: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.ChildWithParents}/parents`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: '_PartialCollection',
        id: `/${ElementUuid.ChildWithParents}/parents?page=1&pageSize=25`,
        totalNodes: 2,
        links: {
          first: `/${ElementUuid.ChildWithParents}/parents?page=1&pageSize=25`,
          previous: null,
          next: null,
          last: `/${ElementUuid.ChildWithParents}/parents?page=1&pageSize=25`,
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
            end: ElementUuid.ChildWithParents,
            data: {
              some: 'data',
            },
          },
          {
            type: 'OWNS',
            id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
            start: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            end: ElementUuid.ChildWithParents,
            data: {
              some: 'data',
            },
          },
        ],
      }),
    );
  }),
];
export default parentsHandler;
