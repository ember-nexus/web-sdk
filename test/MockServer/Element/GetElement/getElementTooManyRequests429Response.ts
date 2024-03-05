import { HttpResponse, http } from 'msw';

const getElementTooManyRequests429Response = http.get('http://mock-api/43d39932-2882-43c2-b526-1ab282bc145d', () => {
  return HttpResponse.json(
    {
      type: 'http://ember-nexus-api/error/429/too-many-requests',
      title: 'Unauthorized',
      status: 429,
      detail: 'wip',
    },
    {
      status: 429,
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

export { getElementTooManyRequests429Response };
