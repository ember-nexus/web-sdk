import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

class RawValueToNormalizedValueEvent implements StoppableEvent {
  private normalizedValue: unknown = null;
  private propagationStopped: boolean = false;

  constructor(private rawValue: unknown) {}

  /**
   * @inheritDoc
   */
  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }

  /**
   * @inheritDoc
   */
  stopPropagation(): RawValueToNormalizedValueEvent {
    this.propagationStopped = true;
    return this;
  }

  /**
   * Returns the raw value set during the event's creation.
   */
  getRawValue(): unknown {
    return this.rawValue;
  }

  /**
   * Returns the normalized value, i.e. the JavaScript representation.
   */
  getNormalizedValue(): unknown {
    return this.normalizedValue;
  }

  /**
   * Sets the normalized value, i.e. the JavaScript representation.
   * @param normalizedValue Normalized value.
   */
  setNormalizedValue(normalizedValue: unknown): RawValueToNormalizedValueEvent {
    this.normalizedValue = normalizedValue;
    return this;
  }
}

export { RawValueToNormalizedValueEvent };
