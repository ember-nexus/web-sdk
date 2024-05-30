import { EmberNexusError } from './EmberNexusError';

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
