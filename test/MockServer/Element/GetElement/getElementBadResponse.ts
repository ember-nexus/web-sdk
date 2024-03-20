import { HttpResponse, http } from 'msw';

const getElementBadResponse = http.get('http://mock-api/afaa7a87-e523-4bf0-afe8-d2a11802c549', () => {
  return HttpResponse.text('Some content which can not be interpreted as JSON.', {
    status: 200,
    headers: {
      'Access-Control-Allow-Headers':
        'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Methods':
        'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
      'Access-Control-Allow-Origin': '*',
      Allow: 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK',
      'Cache-Control': 'no-cache, private',
      'Content-Type': 'text/plain; charset=utf-8',
      Date: 'Fri, 06 Oct 2023 20:24:10 GMT',
      Etag: '"YgbFC4u5EgC"',
      Server: 'Unit',
      'Transfer-Encoding': 'chunked',
      'X-Powered-By': 'Ember Nexus API',
    },
  });
});

export { getElementBadResponse };
