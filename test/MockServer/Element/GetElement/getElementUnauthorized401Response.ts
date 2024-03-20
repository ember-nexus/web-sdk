import { HttpResponse, http } from 'msw';

const getElementUnauthorized401Response = http.get('http://mock-api/5324396a-636a-4263-ac38-62fef3132ead', () => {
  return HttpResponse.json(
    {
      type: 'http://ember-nexus-api/error/401/unauthorized',
      title: 'Unauthorized',
      status: 401,
      detail:
        "Authorization for the request failed due to possible problems with the token (incorrect or expired), password (incorrect or changed), the user's unique identifier, or the user's status (e.g., missing, blocked, or deleted).",
    },
    {
      status: 401,
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

export { getElementUnauthorized401Response };
