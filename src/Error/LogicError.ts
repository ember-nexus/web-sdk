import { EmberNexusError } from './EmberNexusError.js';

/**
 * Logic error class.
 */
class LogicError extends EmberNexusError {
  constructor(message?: string) {
    super(message);
    this.name = 'LogicError';
  }
}

export { LogicError };
