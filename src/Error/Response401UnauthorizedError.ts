import { ResponseError } from './ResponseError';

/**
 * Wrapper around Ember Nexus API's 401 unauthorized response.
 *
 * @see [Ember Nexus API: Get Details for Error 401 Unauthorized Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/error/get-401-unauthorized)
 */
class Response401UnauthorizedError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response401UnauthorizedError';
    this.setStatus(401);
  }
}

export { Response401UnauthorizedError };
