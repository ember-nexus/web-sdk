import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import { NormalizedValueToRawValueEvent } from '../../../../../src/EventSystem/NormalizedValueToRawValue/Event';
import { GenericNormalizedValueToRawValueEventListener } from '../../../../../src/EventSystem/NormalizedValueToRawValue/EventListener';

describe('GenericNormalizedValueToRawValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should denormalize a string', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = 'Hello world';
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal('Hello world');
  });

  it('should denormalize a number', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = 1234;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(1234);
  });

  it('should denormalize a boolean', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = true;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(true);
  });

  it('should denormalize null', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = null;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should denormalize an array', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = [1, 4, 3];
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.deep.equal([1, 4, 3]);
  });

  it('should not denormalize an object', () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = { hello: 'world' };
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });
});
