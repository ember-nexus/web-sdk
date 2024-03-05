import { HttpResponse, http } from 'msw';

const getElementNotFound404Response = http.get('http://mock-api/2fe89dfb-ef1c-4964-99da-73161077e951', () => {
  return HttpResponse.json(
    {
      type: 'http://ember-nexus-api/error/404/not-found',
      title: 'NotFound',
      status: 404,
      detail: 'Requested element was not found.',
    },
    {
      status: 404,
      headers: {
        'Access-Control-Allow-Headers':
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Access-Control-Allow-Methods':
          'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
        'Access-Control-Allow-Origin': '*',
        Allow: 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
        'Cache-Control': 'no-cache, private',
        'Content-Type': 'application/problem+json; charset=utf-8',
        Date: 'Fri, 06 Oct 2023 20:24:10 GMT',
        Server: 'Unit',
        'Transfer-Encoding': 'chunked',
        'X-Powered-By': 'Ember Nexus API',
      },
    },
  );
});

export { getElementNotFound404Response };
