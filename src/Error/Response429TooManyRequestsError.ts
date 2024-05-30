import { ResponseError } from './ResponseError';

/**
 * Wrapper around Ember Nexus API's 429 too many requests response.
 *
 * @todo add link to documentation once 429 errors are returned.
 */
class Response429TooManyRequestsError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response429TooManyRequestsError';
    this.setStatus(429);
  }
}

export { Response429TooManyRequestsError };
