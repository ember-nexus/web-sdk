import { ResponseError } from '~/Error/ResponseError';

class Response404NotFoundError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response404NotFoundError';
    this.setStatus(404);
  }
}

export { Response404NotFoundError };
