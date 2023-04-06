import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import ElementUuid from './msw-mock/handlers/index.js';
import server from './msw-mock/server.js';
import EmberNexus from '../../src/ember-nexus.js';
import logger from '../../src/logger.js';

describe('ember nexus tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it('should be able to get elements from the API and cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );
    const node = await emberNexus.getElement(ElementUuid.DataNode);
    expect(node).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
    const cachedNode = await emberNexus.getElement(ElementUuid.DataNode, true);
    expect(cachedNode).to.eql(node);
    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Returned element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache.',
    );
  });

  it('should be able to update elements to the API and clears the cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();

    // verify that the cache is initially empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    // load node which will get updated
    const data = await emberNexus.getElement(ElementUuid.DataNode);
    expect(data).to.not.be.empty;

    // update node, which will remove existing data from the cache
    const voidData = await emberNexus.putElement(ElementUuid.DataNode, { some: 'data' });
    expect(voidData).to.be.undefined;

    // verify that the cache is empty, again
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Replaced data of element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was updated.',
    );
  });

  it('should be able to update elements to the API and refreshes the cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();

    // verify that the cache is initially empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    // load node which will get updated
    const data = await emberNexus.getElement(ElementUuid.DataNode);
    expect(data).to.not.be.empty;

    // update node, which will remove existing data from the cache
    const newData = await emberNexus.putElement(ElementUuid.DataNode, { some: 'data' }, true);
    expect(newData).to.not.be.empty;

    // verify that the cache contains the new node
    const newDataFromCache = await emberNexus.getElement(ElementUuid.DataNode);
    expect(newDataFromCache).to.not.be.empty;

    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Replaced data of element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was updated.',
    );
    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Returned element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache.',
    );
  });

  it('should be able to patch elements to the API and clears the cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();

    // verify that the cache is initially empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    // load node which will get updated
    const data = await emberNexus.getElement(ElementUuid.DataNode);
    expect(data).to.not.be.empty;

    // patch node, which will remove existing data from the cache
    const voidData = await emberNexus.patchElement(ElementUuid.DataNode, { some: 'data' });
    expect(voidData).to.be.undefined;

    // verify that the cache is empty, again
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Patched element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was patched.',
    );
  });

  it('should be able to patch elements to the API and refreshes the cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();

    // verify that the cache is initially empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    // load node which will get updated
    const data = await emberNexus.getElement(ElementUuid.DataNode);
    expect(data).to.not.be.empty;

    // patch node, which will remove existing data from the cache
    const newData = await emberNexus.patchElement(ElementUuid.DataNode, { some: 'data' }, true);
    expect(newData).to.not.be.empty;

    // verify that the cache contains the new node
    const newDataFromCache = await emberNexus.getElement(ElementUuid.DataNode);
    expect(newDataFromCache).to.not.be.empty;

    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Patched element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was patched.',
    );
    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(
      debugLogger,
      'Returned element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache.',
    );
  });

  it('should be able to delete elements from the API and clears the cache', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');
    const emberNexus = new EmberNexus();

    // verify that the cache is initially empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    // load node which will get deleted
    const data = await emberNexus.getElement(ElementUuid.DataNode);
    expect(data).to.not.be.empty;

    // delete node, which will remove existing data from the cache
    const newData = await emberNexus.deleteElement(ElementUuid.DataNode);
    expect(newData).to.be.undefined;

    // verify that the cache is empty
    await expect(emberNexus.getElement(ElementUuid.DataNode, true)).to.be.rejectedWith(
      Error,
      'Unable to find element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d in cache.',
    );

    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
    assert.calledWithExactly(debugLogger, 'Deleted element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.');
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was deleted.',
    );
  });
});
