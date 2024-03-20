import { EmberNexusError } from '~/Error/EmberNexusError';

class ValidationError extends EmberNexusError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export { ValidationError };
