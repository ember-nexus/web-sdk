import { RestHandler, rest } from 'msw';

const indexHandler: RestHandler[] = [
  rest.get('http://localhost/', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
      }),
    );
  }),
];
export default indexHandler;
