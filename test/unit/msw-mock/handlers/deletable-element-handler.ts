import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

export const deletableElementHandlers: RestHandler[] = [
  rest.delete(`http://localhost/${ElementUuid.DeletableElement}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.delete(`http://localhost/${ElementUuid.DataNode}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
