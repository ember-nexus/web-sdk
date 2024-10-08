import { expect } from 'chai';
import { DateTime } from 'luxon';
import { SinonSandbox, createSandbox } from 'sinon';

import { RawValueToNormalizedValueEvent } from '../../../../../src/EventSystem/RawValueToNormalizedValue/Event';
import { DateTimeRawValueToNormalizedValueEventListener } from '../../../../../src/EventSystem/RawValueToNormalizedValue/EventListener';

describe('DateTimeRawValueToNormalizedValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should normalize a date string', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = '2023-11-21T16:20:19+00:00';
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
    expect(
      DateTime.fromJSDate(<Date>rawValueToNormalizedValueEvent.getNormalizedValue()).toFormat(
        "yyyy-MM-dd'T'HH:mm:ssZZ",
      ),
    ).to.equal('2023-11-21T16:20:19+00:00');
  });

  it('should not denormalize a string', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = 'test';
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should not denormalize a number', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = 1234;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should not denormalize a boolean', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = true;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should not denormalize null', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = null;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should not denormalize an array', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = [1, 2, 3];
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });

  it('should not denormalize an object', () => {
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener();

    const input = { hello: 'world' };
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.null;
  });
});
