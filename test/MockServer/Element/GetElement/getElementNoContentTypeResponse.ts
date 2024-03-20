import { HttpResponse, http } from 'msw';

const getElementNoContentTypeResponse = http.get('http://mock-api/d00d3faf-5dc9-43f1-9efc-f78c2d7efa77', () => {
  const response = HttpResponse.text('Some content which can not be interpreted as JSON.', {
    status: 200,
    headers: {
      'Access-Control-Allow-Headers':
        'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Methods':
        'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
      'Access-Control-Allow-Origin': '*',
      Allow: 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
      'Cache-Control': 'no-cache, private',
      Date: 'Fri, 06 Oct 2023 20:24:10 GMT',
      Etag: '"YgbFC4u5EgC"',
      Server: 'Unit',
      'Transfer-Encoding': 'chunked',
      'X-Powered-By': 'Ember Nexus API',
    },
  });
  response.headers.delete('Content-Type');
  return response;
});

export { getElementNoContentTypeResponse };
