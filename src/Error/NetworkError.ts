import { EmberNexusError } from '~/Error/EmberNexusError';

class NetworkError extends EmberNexusError {
  constructor(message, originalError) {
    super(message);
    this.name = 'NetworkError';
    this.cause = originalError;
  }
}

export { NetworkError };
