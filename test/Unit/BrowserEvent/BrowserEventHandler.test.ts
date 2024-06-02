import { expect } from 'chai';
import { createSandbox } from 'sinon';
import { Container } from 'typedi';

import { BrowserEventHandler } from '../../../src/BrowserEvent';
import {
  GetElementChildrenEvent,
  GetElementEvent,
  GetElementParentsEvent,
  GetElementRelatedEvent,
  GetIndexEvent,
  PatchElementEvent,
  PostElementEvent,
  PostIndexEvent,
  PutElementEvent,
} from '../../../src/BrowserEvent/Element';
import { EmberNexus } from '../../../src/Service';
import { Collection, Data, Node, NodeWithOptionalId, validateUuidFromString } from '../../../src/Type/Definition';

class ElementMock {
  eventListeners: object = {};

  // eslint-disable-next-line
  addEventListener(key: string, listener: Function): void {
    this.eventListeners[key] = listener;
  }

  // eslint-disable-next-line
  removeEventListener(key: string, _listener: Function) {
    delete this.eventListeners[key];
  }

  getEventListeners(): object {
    return this.eventListeners;
  }
}

describe('BrowserEventHandler tests', () => {
  test('BrowserEventHandler', () => {
    const element = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(element as HTMLElement);

    const eventListenerKeys = Object.keys(element.getEventListeners());
    expect(eventListenerKeys).to.have.length(16);

    // user
    expect(eventListenerKeys).to.include('ember-nexus-post-register');
    expect(eventListenerKeys).to.include('ember-nexus-post-change-password');
    expect(eventListenerKeys).to.include('ember-nexus-get-me');
    expect(eventListenerKeys).to.include('ember-nexus-post-token');
    expect(eventListenerKeys).to.include('ember-nexus-get-token');
    expect(eventListenerKeys).to.include('ember-nexus-delete-token');

    // element
    expect(eventListenerKeys).to.include('ember-nexus-get-index');
    expect(eventListenerKeys).to.include('ember-nexus-get-element');
    expect(eventListenerKeys).to.include('ember-nexus-get-element-parents');
    expect(eventListenerKeys).to.include('ember-nexus-get-element-children');
    expect(eventListenerKeys).to.include('ember-nexus-get-element-related');
    expect(eventListenerKeys).to.include('ember-nexus-post-index');
    expect(eventListenerKeys).to.include('ember-nexus-post-element');
    expect(eventListenerKeys).to.include('ember-nexus-put-element');
    expect(eventListenerKeys).to.include('ember-nexus-patch-element');
    expect(eventListenerKeys).to.include('ember-nexus-delete-element');

    // search
    // expect(eventListenerKeys).to.include('ember-nexus-post-search');

    // system
    // expect(eventListenerKeys).to.include('ember-nexus-get-instance-configuration');

    browserEventHandler.removeBrowserEventListeners();

    expect(Object.keys(element.getEventListeners())).to.have.length(0);

    browserEventHandler.destructor();
  });

  test('BrowserEventHandler handleGetElementEvent', async () => {
    const sandbox = createSandbox();
    const uuid = validateUuidFromString('b4b64462-e69f-4acb-8126-05b088f82d9c');
    const elementToBeReturned = {
      type: 'Data',
      id: uuid,
      data: {},
    } as Node;
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'getElement').resolves(elementToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new GetElementEvent(uuid);
    elementMock.getEventListeners()['ember-nexus-get-element'](event);
    const returnedElement = await event.getElement();
    expect(returnedElement).to.be.equal(elementToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handleGetElementChildrenEvent', async () => {
    const sandbox = createSandbox();
    const uuid = validateUuidFromString('b4b64462-e69f-4acb-8126-05b088f82d9c');
    const collectionToBeReturned = {
      id: '-',
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      nodes: [],
      relations: [],
    } as Collection;
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'getElementChildren').resolves(collectionToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new GetElementChildrenEvent(uuid);
    elementMock.getEventListeners()['ember-nexus-get-element-children'](event);
    const returnedCollection = await event.getChildren();
    expect(returnedCollection).to.be.equal(collectionToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handleGetElementParentsEvent', async () => {
    const sandbox = createSandbox();
    const uuid = validateUuidFromString('b4b64462-e69f-4acb-8126-05b088f82d9c');
    const collectionToBeReturned = {
      id: '-',
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      nodes: [],
      relations: [],
    } as Collection;
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'getElementParents').resolves(collectionToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new GetElementParentsEvent(uuid);
    elementMock.getEventListeners()['ember-nexus-get-element-parents'](event);
    const returnedCollection = await event.getParents();
    expect(returnedCollection).to.be.equal(collectionToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handleGetElementRelatedEvent', async () => {
    const sandbox = createSandbox();
    const uuid = validateUuidFromString('b4b64462-e69f-4acb-8126-05b088f82d9c');
    const collectionToBeReturned = {
      id: '-',
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      nodes: [],
      relations: [],
    } as Collection;
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'getElementRelated').resolves(collectionToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new GetElementRelatedEvent(uuid);
    elementMock.getEventListeners()['ember-nexus-get-element-related'](event);
    const returnedCollection = await event.getRelated();
    expect(returnedCollection).to.be.equal(collectionToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handleGetIndexEvent', async () => {
    const sandbox = createSandbox();
    const collectionToBeReturned = {
      id: '-',
      totalNodes: 0,
      links: {
        first: '-',
        previous: null,
        next: null,
        last: '-',
      },
      nodes: [],
      relations: [],
    } as Collection;
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'getIndex').resolves(collectionToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new GetIndexEvent();
    elementMock.getEventListeners()['ember-nexus-get-index'](event);
    const returnedCollection = await event.getIndexElements();
    expect(returnedCollection).to.be.equal(collectionToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handlePostIndexEvent', async () => {
    const sandbox = createSandbox();
    const uuidToBeReturned = validateUuidFromString('756db94c-4c39-46f2-94e8-c35c6548d157');
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'postIndex').resolves(uuidToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new PostIndexEvent({
      type: 'Data',
      data: {},
    } as NodeWithOptionalId);
    elementMock.getEventListeners()['ember-nexus-post-index'](event);
    const returnedUuid = await event.getResult();
    expect(returnedUuid).to.be.equal(uuidToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handlePostElementEvent', async () => {
    const sandbox = createSandbox();
    const uuidToBeReturned = validateUuidFromString('756db94c-4c39-46f2-94e8-c35c6548d157');
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'postElement').resolves(uuidToBeReturned);
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new PostElementEvent(validateUuidFromString('58a7dc13-ac78-4cac-b786-b09275a60c9e'), {
      type: 'Data',
      data: {},
    } as NodeWithOptionalId);
    elementMock.getEventListeners()['ember-nexus-post-element'](event);
    const returnedUuid = await event.getResult();
    expect(returnedUuid).to.be.equal(uuidToBeReturned);

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handlePutElementEvent', async () => {
    const sandbox = createSandbox();
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'putElement').resolves();
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new PutElementEvent(validateUuidFromString('58a7dc13-ac78-4cac-b786-b09275a60c9e'), {} as Data);
    elementMock.getEventListeners()['ember-nexus-put-element'](event);
    await event.getResult();

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });

  test('BrowserEventHandler handlePatchElementEvent', async () => {
    const sandbox = createSandbox();
    const emberNexus = new EmberNexus();
    sandbox.stub(emberNexus, 'patchElement').resolves();
    Container.set(EmberNexus, emberNexus);
    const elementMock = new ElementMock();
    const browserEventHandler = new BrowserEventHandler();
    // @ts-expect-error force use of partially compatible type without error
    browserEventHandler.addBrowserEventListeners(elementMock as HTMLElement);

    const event = new PatchElementEvent(validateUuidFromString('58a7dc13-ac78-4cac-b786-b09275a60c9e'), {} as Data);
    elementMock.getEventListeners()['ember-nexus-patch-element'](event);
    await event.getResult();

    browserEventHandler.removeBrowserEventListeners();
    browserEventHandler.destructor();
    sandbox.restore();
  });
});
