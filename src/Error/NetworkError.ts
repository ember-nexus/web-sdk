import { EmberNexusError } from './EmberNexusError';

/**
 * Generic network error.
 */
class NetworkError extends EmberNexusError {
  constructor(message?: string, originalError?: unknown) {
    super(message);
    this.name = 'NetworkError';
    this.cause = originalError;
  }
}

export { NetworkError };
