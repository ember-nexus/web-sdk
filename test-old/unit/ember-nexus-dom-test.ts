import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { expect } from 'chai';
import { SinonSandbox, assert, createSandbox, match } from 'sinon';

import ElementUuid from './msw-mock/handlers/index.js';
import server from './msw-mock/server.js';
import EmberNexus from '../../src/ember-nexus.js';
import DeleteElementEvent from '../../src/event/delete-element-event.js';
import GetElementEvent from '../../src/event/get-element-event.js';
import PatchElementEvent from '../../src/event/patch-element-event.js';
import PutElementEvent from '../../src/event/put-element-event.js';
import logger from '../../src/logger.js';

describe('ember nexus tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
    GlobalRegistrator.register();
    document.body.innerHTML = `<html>
         <body>
           <div id="ember-nexus-root">
             <div id="child-1">
               <div id="child-2" />
             </div>
           </div>
         </body>
       </html>`;
    const emberNexus = new EmberNexus();
    const domElement = document.getElementById('ember-nexus-root');
    emberNexus.bindToDomElement(domElement);
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
    GlobalRegistrator.unregister();
  });

  it('should be able to handle the event ember-nexus-get-element', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new GetElementEvent(ElementUuid.DataNode);
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
    assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      match.any,
    );
  });

  it('should be able to handle the event ember-nexus-put-element', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new PutElementEvent(ElementUuid.DataNode, { new: 'data' });
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.be.undefined;
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

  it('should be able to handle the event ember-nexus-put-element with load new data set to true', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new PutElementEvent(ElementUuid.DataNode, { new: 'data' }, true);
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
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
  });

  it('should be able to handle the event ember-nexus-patch-element', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new PatchElementEvent(ElementUuid.DataNode, { new: 'data' });
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.be.undefined;
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

  it('should be able to handle the event ember-nexus-patch-element with load new data set to true', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new PatchElementEvent(ElementUuid.DataNode, { new: 'data' }, true);
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
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
  });

  it('should be able to handle the event ember-nexus-patch-element with load new data set to true', async () => {
    const debugLogger = sandbox.stub(logger, 'debug');

    const event = new DeleteElementEvent(ElementUuid.DataNode);
    const child2 = document.getElementById('child-2');
    child2.dispatchEvent(event);
    const element = await event.getElement().then((element) => {
      return element;
    });

    expect(element).to.be.undefined;
    assert.calledWithExactly(debugLogger, 'Deleted element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.');
    assert.calledWithExactly(
      debugLogger,
      'Removed element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d from cache as it was deleted.',
    );
  });
});
