import { http } from 'msw';

const getElementErrorNetworkResponse = http.get('http://mock-api/df6604fb-72a1-4616-90b1-e72eee3aca6c', () => {
  return Response.error();
});

export { getElementErrorNetworkResponse };
