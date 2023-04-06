import { RestHandler, rest } from 'msw';

import ElementUuid from './index.js';

const forbiddenHandlers: RestHandler[] = [
  rest.get(`http://localhost/${ElementUuid.ForbiddenElement}`, (_req, res, ctx) => {
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
  }),
  rest.get(`http://localhost/${ElementUuid.ForbiddenParentWithChildren}/children`, (_req, res, ctx) => {
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
  }),
  rest.get(`http://localhost/${ElementUuid.ForbiddenChildWithParents}/parents`, (_req, res, ctx) => {
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
  }),
  rest.get(`http://localhost/${ElementUuid.ForbiddenElementWithRelatedElements}/related`, (_req, res, ctx) => {
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
  }),
  rest.delete(`http://localhost/${ElementUuid.ForbiddenDeletableElement}`, (_req, res, ctx) => {
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
  }),
  rest.put(`http://localhost/${ElementUuid.ForbiddenUpdateableElement}`, (_req, res, ctx) => {
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
  }),
  rest.patch(`http://localhost/${ElementUuid.ForbiddenPatchableElement}`, (_req, res, ctx) => {
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
  }),
];
export default forbiddenHandlers;
