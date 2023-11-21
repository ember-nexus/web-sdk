import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { DateTimeNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/DateTimeNormalizedValueToRawValueEventListener';
import { NormalizedValueToRawValueEventManager } from '~/EventSystem/NormalizedValueToRawValue/NormalizedValueToRawValueEventManager';

describe('DateTimeNormalizedValueToRawValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should denormalize a date', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = new Date('2023-11-21T16:20:19+00:00');
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal('2023-11-21T16:20:19+00:00');
  });

  it('should not denormalize a string', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = 'test';
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });

  it('should not denormalize a number', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = 1234;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });

  it('should not denormalize a boolean', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = true;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });

  it('should not denormalize null', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = null;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });

  it('should not denormalize an array', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = [1, 2, 3];
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });

  it('should not denormalize an object', async () => {
    const normalizedValueToRawValueEventManager = sandbox.createStubInstance(NormalizedValueToRawValueEventManager);
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener(
      normalizedValueToRawValueEventManager,
    );

    const input = { hello: 'world' };
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.undefined;
  });
});
