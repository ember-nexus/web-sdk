import { EmberNexusError } from './EmberNexusError';

/**
 * Logic error class.
 */
class LogicError extends EmberNexusError {
  constructor(message) {
    super(message);
    this.name = 'LogicError';
  }
}

export { LogicError };
