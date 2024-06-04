import { ResponseError } from './ResponseError.js';

/**
 * Wrapper around Ember Nexus API's 403 forbidden response.
 *
 * @see [Ember Nexus API: Get Details for Error 403 Forbidden Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/error/get-403-forbidden)
 */
class Response403ForbiddenError extends ResponseError {
  constructor(message?: string) {
    super(message);
    this.name = 'Response403ForbiddenError';
    this.setStatus(403);
  }
}

export { Response403ForbiddenError };
