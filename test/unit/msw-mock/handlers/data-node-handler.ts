import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

export const dataNodeHandlers: RestHandler[] = [
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
];
