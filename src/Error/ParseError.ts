import { EmberNexusError } from '~/Error/EmberNexusError';

class ParseError extends EmberNexusError {
  constructor(message) {
    super(message);
    this.name = 'ParseError';
  }
}

export { ParseError };
