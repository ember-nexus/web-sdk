import { expect } from 'chai';
import { DateTime } from 'luxon';
import { SinonSandbox, createSandbox } from 'sinon';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { DateTimeRawValueToNormalizedValueEventListener } from '~/EventSystem/RawValueToNormalizedValue/EventListener/DateTimeRawValueToNormalizedValueEventListener';
import { RawValueToNormalizedValueEventManager } from '~/EventSystem/RawValueToNormalizedValue/RawValueToNormalizedValueEventManager';

describe('DateTimeRawValueToNormalizedValueEventListener tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should normalize a date string', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

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

  it('should not denormalize a string', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = 'test';
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });

  it('should not denormalize a number', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = 1234;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });

  it('should not denormalize a boolean', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = true;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });

  it('should not denormalize null', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = null;
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });

  it('should not denormalize an array', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = [1, 2, 3];
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });

  it('should not denormalize an object', async () => {
    const rawValueToNormalizedValueEventManager = sandbox.createStubInstance(RawValueToNormalizedValueEventManager);
    const dateTimeRawValueToNormalizedValueEventListener = new DateTimeRawValueToNormalizedValueEventListener(
      rawValueToNormalizedValueEventManager,
    );

    const input = { hello: 'world' };
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent(input);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    dateTimeRawValueToNormalizedValueEventListener.triggerOnEvent(rawValueToNormalizedValueEvent);

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
  });
});
