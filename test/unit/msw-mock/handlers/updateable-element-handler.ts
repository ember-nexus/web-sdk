import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const updateableElementHandlers: RestHandler[] = [
  rest.put(`http://localhost/${ElementUuid.UpdateableElement}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.put(`http://localhost/${ElementUuid.DataNode}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
export default updateableElementHandlers;
