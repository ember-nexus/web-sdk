import { HttpResponse, http } from 'msw';

const getElementNormal200Response = http.get('http://mock-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5', () => {
  return HttpResponse.json(
    {
      type: 'Data',
      id: 'b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5',
      data: {
        created: '2023-10-06T20:27:56+00:00',
        updated: '2023-10-06T20:27:56+00:00',
        name: 'Test Data',
      },
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Headers':
          'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Access-Control-Allow-Methods':
          'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
        'Access-Control-Allow-Origin': '*',
        Allow: 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
        'Cache-Control': 'no-cache, private',
        'Content-Type': 'application/json; charset=utf-8',
        Date: 'Fri, 06 Oct 2023 20:24:10 GMT',
        Etag: '"YgbFC4u5EgC"',
        Server: 'Unit',
        'Transfer-Encoding': 'chunked',
        'X-Powered-By': 'Ember Nexus API',
      },
    },
  );
});

export { getElementNormal200Response };
