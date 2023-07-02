import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import EmberNexus from '../../src/EmberNexus.js';
import Options from '../../src/Options.js';
import testLogger from '../testLogger.js';

describe('GetRelatedEndpoint tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass exception along', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:token-does-not-exist');
    const cache = EmberNexus.create(testLogger, options);

    await expect(cache.getRelated(testUuid)).to.be.rejectedWith(
      Error,
      'Encountered error while loading related elements from element with identifier 1ab54e88-a9cc-481a-b371-8873ca56c51b: Unauthorized - Request requires authorization.',
    );
  });

  it('should load related', async () => {
    const testUuid = '1ab54e88-a9cc-481a-b371-8873ca56c51b';

    const options = new Options();
    options.setApiHost('http://ember-nexus-app-api/');
    options.setToken('secret-token:FcXR4LsliYfWkYFKhTVovA');
    const cache = EmberNexus.create(testLogger, options);

    const res = await cache.getRelated(testUuid);
    expect(res).to.be.length(126);
  });
});
