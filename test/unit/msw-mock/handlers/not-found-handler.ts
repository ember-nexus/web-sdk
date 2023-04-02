import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

export const notFoundHandlers: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.NotFoundElement}`, (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.set({
        'content-type': 'application/problem+json',
      }),
      ctx.body(
        JSON.stringify({
          type: '404-not-found',
          title: 'Not Found',
          status: 404,
          detail: 'The requested resource was not found.',
        }),
      ),
    );
  }),
  rest.get(`http://localhost/${ElementUuid.NotFoundParentWithChildren}/children`, (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.set({
        'content-type': 'application/problem+json',
      }),
      ctx.body(
        JSON.stringify({
          type: '404-not-found',
          title: 'Not Found',
          status: 404,
          detail: 'The requested resource was not found.',
        }),
      ),
    );
  }),
  rest.get(`http://localhost/${ElementUuid.NotFoundChildWithParents}/parents`, (_req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.set({
        'content-type': 'application/problem+json',
      }),
      ctx.body(
        JSON.stringify({
          type: '404-not-found',
          title: 'Not Found',
          status: 404,
          detail: 'The requested resource was not found.',
        }),
      ),
    );
  }),
];
