import { EmberNexusError } from '.';

/**
 * Validation error class.
 *
 * Validation errors are thrown when data is parseable but does not match a context dependent data scheme.
 */
class ValidationError extends EmberNexusError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export { ValidationError };
