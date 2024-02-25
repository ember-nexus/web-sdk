import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const malformedDataNodeHandlers: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.MalformedDataNode}`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: ElementUuid.MalformedDataNode,
        data: {
          some: 'data',
        },
      }),
    );
  }),
];
export default malformedDataNodeHandlers;
