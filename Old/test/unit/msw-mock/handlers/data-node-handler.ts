import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const dataNodeHandlers: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.DataNode}`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: 'Node',
        id: ElementUuid.DataNode,
        data: {
          some: 'data',
        },
      }),
    );
  }),
  rest.get(`http://localhost/${ElementUuid.AuthenticatedDataNode}`, (_req, res, ctx) => {
    if (!_req.headers.has('authorization')) {
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
    return res(
      ctx.status(200),
      ctx.json({
        type: 'Node',
        id: ElementUuid.AuthenticatedDataNode,
        data: {
          some: 'data',
        },
      }),
    );
  }),
];

export default dataNodeHandlers;
