import { expect } from 'chai';

import { NormalizedValueToRawValueEvent } from '../../../../../src/EventSystem/NormalizedValueToRawValue/Event';

describe('NormalizedValueToRawValueEvent tests', () => {
  it('should satisfy initial properties', async () => {
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent('test');

    expect(normalizedValueToRawValueEvent.getNormalizedValue()).to.equal('test');
    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;
    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;
  });

  it("should be able to stop the event's propagation", async () => {
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent('test');

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.false;

    normalizedValueToRawValueEvent.stopPropagation();

    expect(normalizedValueToRawValueEvent.isPropagationStopped()).to.be.true;
  });

  it("should be able to set the event's raw value", async () => {
    const normalizedValueToRawValueEvent = new NormalizedValueToRawValueEvent('test');

    expect(normalizedValueToRawValueEvent.getRawValue()).to.be.null;

    normalizedValueToRawValueEvent.setRawValue('test');
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal('test');

    normalizedValueToRawValueEvent.setRawValue(1234);
    expect(normalizedValueToRawValueEvent.getRawValue()).to.equal(1234);
  });
});
