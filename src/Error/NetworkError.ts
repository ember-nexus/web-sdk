import { EmberNexusError } from '~/Error/EmberNexusError';

/**
 * Generic network error.
 */
class NetworkError extends EmberNexusError {
  constructor(message, originalError) {
    super(message);
    this.name = 'NetworkError';
    this.cause = originalError;
  }
}

export { NetworkError };
