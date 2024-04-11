import { ResponseError } from '~/Error/ResponseError';

/**
 * Wrapper around Ember Nexus API's 404 not found response.
 *
 * @see [Ember Nexus API: Get Details for Error 404 Not Found Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/error/get-404-not-found)
 */
class Response404NotFoundError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response404NotFoundError';
    this.setStatus(404);
  }
}

export { Response404NotFoundError };
