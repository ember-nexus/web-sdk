import { RestHandler, rest } from 'msw';

const indexHandler: RestHandler[] = [
  rest.get('http://localhost/', (_req, res, ctx) => {
    if (_req.headers.has('authorization')) {
      if (_req.headers.get('authorization') !== 'secret-token:gRDDumwGJbb') {
        return res(
          ctx.status(403),
          ctx.set({
            'content-type': 'application/problem+json',
          }),
          ctx.body(
            JSON.stringify({
              type: '403-forbidden',
              title: 'Forbidden',
              status: 403,
              detail: 'Client does not have permissions to perform action.',
            }),
          ),
        );
      }
    }
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
