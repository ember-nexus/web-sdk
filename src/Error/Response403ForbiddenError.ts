import { ResponseError } from '~/Error/ResponseError';

class Response403ForbiddenError extends ResponseError {
  constructor(message) {
    super(message);
    this.name = 'Response403ForbiddenError';
    this.setStatus(403);
  }
}

export { Response403ForbiddenError };
