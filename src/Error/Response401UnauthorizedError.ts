import { ResponseError } from '~/Error/ResponseError';

class Response401UnauthorizedError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response401UnauthorizedError';
    this.setStatus(401);
  }
}

export { Response401UnauthorizedError };
