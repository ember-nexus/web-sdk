import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexusCache from '../../src/EmberNexusCache.js';
import Options from '../../src/Options.js';
import testLogger from '../testLogger.js';

describe('GetElementEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass exception along', async () => {
    const testUuid = '6776aa5c-63a0-455e-8fab-3bf19cc9a157';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:token-does-not-exist');
    const cache = EmberNexusCache.create(testLogger, options);

    await expect(cache.getElement(testUuid)).to.be.rejectedWith(
      Error,
      'Encountered error while loading element with identifier 6776aa5c-63a0-455e-8fab-3bf19cc9a157: 401 Unauthorized - Request requires authorization.',
    );
  });

  it('should load element', async () => {
    const testUuid = '6776aa5c-63a0-455e-8fab-3bf19cc9a157';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexusCache.create(testLogger, options);

    const res = await cache.getElement(testUuid);
    const data = res.data as { name: string };

    if (!Object.prototype.hasOwnProperty.call(data, 'name')) {
      throw new Error('Property name not found in data.');
    }

    expect(data.name).to.equal('Data 54');
  });
});
