import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import { RawValueToNormalizedValueEvent } from '../../../../../src/EventSystem/RawValueToNormalizedValue/Event';
import { GenericRawValueToNormalizedValueEventListener } from '../../../../../src/EventSystem/RawValueToNormalizedValue/EventListener';

describe('GenericRawValueToNormalizedValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should normalize a string', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = 'Hello world';
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal('Hello world');
  });

  it('should normalize a number', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = 1234;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal(1234);
  });

  it('should normalize a boolean', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = true;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal(true);
  });

  it('should normalize null', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = null;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should normalize an array', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = [1, 4, 3];
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.deep.equal([1, 4, 3]);
  });

  it('should not normalize an object', async () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = { hello: 'world' };
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });
});
