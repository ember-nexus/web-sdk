import { EmberNexusError } from './EmberNexusError.js';

/**
 * Validation error class.
 *
 * Validation errors are thrown when data is parseable but does not match a context dependent data scheme.
 */
class ValidationError extends EmberNexusError {
  constructor(message?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export { ValidationError };
