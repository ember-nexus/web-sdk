import { createUniqueUserIdentifierFromString } from '../../../../src/Type/Definition';

describe('UniqueUserIdentifier tests', () => {
  it('should pass every string as valid user identifier', () => {
    createUniqueUserIdentifierFromString('someone@localhost.dev');
    createUniqueUserIdentifierFromString('some name');
    createUniqueUserIdentifierFromString('123456789');
  });
});
