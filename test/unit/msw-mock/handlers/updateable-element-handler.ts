import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

export const updateableElementHandlers: RestHandler[] = [
  rest.put(`http://localhost/${ElementUuid.UpdateableElement}`, (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
