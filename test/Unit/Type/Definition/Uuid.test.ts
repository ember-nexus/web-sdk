import { expect } from 'chai';

import { validateUuidFromString } from '../../../../src/Type/Definition';

describe('Uuid tests', () => {
  it('should validate real uuid without problems', async () => {
    const rawUuid = '3886791a-2a44-4cca-80de-ff191b212164';
    validateUuidFromString(rawUuid);
  });

  it('should throw exception if token does not match schema', async () => {
    const rawToken = 'something different';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v1', async () => {
    const rawToken = '003a1d88-20fa-11ef-9262-0242ac120002';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v2', async () => {
    const rawToken = '000003e8-20fa-21ef-9d00-325096b39f47';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v3', async () => {
    const rawToken = 'd0430a4c-7cf5-3809-a46b-fedfe3af9da7';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v5', async () => {
    const rawToken = '5b825d68-55f4-5563-956b-f0e22cec68ae';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v6', async () => {
    const rawToken = '016b2446-8cb4-6cef-9f8b-b7a106e4e179';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v7', async () => {
    const rawToken = '018fd9b6-4380-7594-9521-67c84f80570b';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });

  it('should throw exception if token is uuid v8', async () => {
    const rawToken = '07e70c15-0f38-8bfc-ba65-f0ec85dc2812';
    expect(() => {
      validateUuidFromString(rawToken);
    }).to.throw('Passed variable is not a valid UUID v4.');
  });
});
