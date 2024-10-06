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

  it('should normalize a string', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = 'Hello world';
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal('Hello world');
  });

  it('should normalize a number', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = 1234;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal(1234);
  });

  it('should normalize a boolean', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = true;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal(true);
  });

  it('should normalize null', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = null;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should normalize an array', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = [1, 4, 3];
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.deep.equal([1, 4, 3]);
  });

  it('should not normalize an object', () => {
    const genericRawValueToNormalizedValueEventListener = new GenericRawValueToNormalizedValueEventListener();

    const input = { hello: 'world' };
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    genericRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });
});
