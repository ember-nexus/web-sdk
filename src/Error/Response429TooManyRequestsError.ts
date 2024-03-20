import { ResponseError } from '~/Error/ResponseError';

class Response429TooManyRequestsError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response429TooManyRequestsError';
    this.setStatus(429);
  }
}

export { Response429TooManyRequestsError };
