import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

export const notFoundHandlers: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.NotFoundElement}`, (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.set('Content-Type', 'application/problem+json'),
      ctx.json({
        type: '404-not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found.',
      }),
    );
  }),
];
