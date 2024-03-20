import { expect } from 'chai';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';

describe('RawValueToNormalizedValueEvent tests', () => {
  it('should satisfy initial properties', async () => {
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent('test');

    expect(rawValueToNormalizedValueEvent.getRawValue()).to.equal('test');
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;
    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;
  });

  it("should be able to stop the event's propagation", async () => {
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent('test');

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.false;

    rawValueToNormalizedValueEvent.stopPropagation();

    expect(rawValueToNormalizedValueEvent.isPropagationStopped()).to.be.true;
  });

  it("should be able to set the event's normalized value", async () => {
    const rawValueToNormalizedValueEvent = new RawValueToNormalizedValueEvent('test');

    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.be.undefined;

    rawValueToNormalizedValueEvent.setNormalizedValue('test');
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal('test');

    rawValueToNormalizedValueEvent.setNormalizedValue(1234);
    expect(rawValueToNormalizedValueEvent.getNormalizedValue()).to.equal(1234);
  });
});
