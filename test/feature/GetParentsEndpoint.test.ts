import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexus from '../../src/EmberNexus.js';
import Options from '../../src/Options.js';
import testLogger from '../testLogger.js';

describe('GetChildrenEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass exception along', async () => {
    const testUuid = '27ebaf04-8bd0-4c8b-9fce-c44f8f63312e';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:token-does-not-exist');
    const cache = EmberNexus.create(testLogger, options);

    await expect(cache.getParents(testUuid)).to.be.rejectedWith(
      Error,
      'Encountered error while loading parents from child with identifier 27ebaf04-8bd0-4c8b-9fce-c44f8f63312e: Unauthorized - Request requires authorization.',
    );
  });

  it('should load parents', async () => {
    const testUuid = '27ebaf04-8bd0-4c8b-9fce-c44f8f63312e';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexus.create(testLogger, options);

    const res = await cache.getParents(testUuid);
    expect(res).to.be.length(124);
  });
});
