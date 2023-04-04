import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import ElementUuid from './msw-mock/handlers/index.js';
import server from './msw-mock/server.js';
import EmberNexus from '../../src/ember-nexus.js';
import GetElementEvent from '../../src/event/get-element-event.js';
import logger from '../../src/logger.js';

describe('ember nexus tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = sinon.createSandbox();
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
    sinon.assert.calledWithExactly(
      debugLogger,
      'Loaded element with identifier c52569b7-1dd8-4018-9c3b-a710abd6982d.',
      sinon.match.any,
    );
  });
});
