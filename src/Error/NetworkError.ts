import { EmberNexusError } from './EmberNexusError';

/**
 * Generic network error.
 */
class NetworkError extends EmberNexusError {
  constructor(message?: string, originalError?: any) {
    super(message);
    this.name = 'NetworkError';
    this.cause = originalError;
  }
}

export { NetworkError };
