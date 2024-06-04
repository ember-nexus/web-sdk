import { Branded } from './Branded.js';
import { ParseError } from '../../Error/index.js';

/**
 * Type safe variant of string containing single UUIDv4.
 */
type Uuid = Branded<string, 'UUID'>;

const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function validateUuidFromString(uuid: string): Uuid {
  if (!uuidv4Regex.test(uuid)) {
    throw new ParseError('Passed variable is not a valid UUID v4.');
  }
  return uuid as Uuid;
}

export { Uuid, validateUuidFromString, uuidv4Regex };
