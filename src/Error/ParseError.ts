import { EmberNexusError } from './EmberNexusError.js';

/**
 * Parse error class.
 */
class ParseError extends EmberNexusError {
  constructor(message?: string) {
    super(message);
    this.name = 'ParseError';
  }
}

export { ParseError };
