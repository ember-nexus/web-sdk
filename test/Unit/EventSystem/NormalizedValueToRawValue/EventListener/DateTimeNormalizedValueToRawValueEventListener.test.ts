import { expect } from 'chai';
import { SinonSandbox, createSandbox } from 'sinon';

import { NormalizedValueToRawValueEvent } from '../../../../../src/EventSystem/NormalizedValueToRawValue/Event';
import { DateTimeNormalizedValueToRawValueEventListener } from '../../../../../src/EventSystem/NormalizedValueToRawValue/EventListener';

describe('DateTimeNormalizedValueToRawValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should denormalize a date', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = new Date('2023-11-21T16:20:19+00:00');
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal('2023-11-21T16:20:19+00:00');
  });

  it('should not denormalize a string', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = 'test';
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should not denormalize a number', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = 1234;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should not denormalize a boolean', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = true;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should not denormalize null', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = null;
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should not denormalize an array', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = [1, 2, 3];
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });

  it('should not denormalize an object', () => {
    const dateTimeNormalizedValueToRawValueEventListener = new DateTimeNormalizedValueToRawValueEventListener();

    const input = { hello: 'world' };
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent(input);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    dateTimeNormalizedValueToRawValueEventListener.triggerOnEvent(normalizedValueToRawValueEvent);

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
  });
});
