enum HttpRequestMethod {
  // default http request methods
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',

  // webdav request methods
  COPY = 'COPY',
  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
  MKCOL = 'MKCOL',
  MOVE = 'MOVE',
  PROPFIND = 'PROPFIND',
  PROPPATCH = 'PROPPATCH',
}

export { HttpRequestMethod };
