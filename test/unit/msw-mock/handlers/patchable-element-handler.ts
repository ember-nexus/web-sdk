import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const patchableElementHandlers: RestHandler[] = [
  rest.patch(`http://localhost/${ElementUuid.PatchableElement}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.patch(`http://localhost/${ElementUuid.DataNode}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
export default patchableElementHandlers;
