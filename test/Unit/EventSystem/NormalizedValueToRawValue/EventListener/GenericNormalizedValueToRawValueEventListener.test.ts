import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { GenericNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/GenericNormalizedValueToRawValueEventListener';

describe('GenericNormalizedValueToRawValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should denormalize a string', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = 'Hello world';
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal('Hello world');
  });

  it('should denormalize a number', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = 1234;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(1234);
  });

  it('should denormalize a boolean', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = true;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(true);
  });

  it('should denormalize null', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = null;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(null);
  });

  it('should denormalize an array', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = [1, 4, 3];
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.deep.equal([1, 4, 3]);
  });

  it('should not denormalize an object', async () => {
    const genericNormalizedValueToRawValueEventListener = new GenericNormalizedValueToRawValueEventListener();

    const input = { hello: 'world' };
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    genericNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });
});
