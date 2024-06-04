import { Branded } from './Branded.js';

/**
 * Type safe variant of string containing single user unique identifier, usually the user's email address.
 */
type UniqueUserIdentifier = Branded<string, 'UniqueUserIdentifier'>;

function createUniqueUserIdentifierFromString(uniqueUserIdentifier: string): UniqueUserIdentifier {
  return uniqueUserIdentifier as UniqueUserIdentifier;
}

export { UniqueUserIdentifier, createUniqueUserIdentifierFromString };
