import { StoppableEvent } from '../../../Type/Definition/index.js';

/**
 * Event object for converting JavaScript variables and especially objects to a representation which can be sent to
 * Ember Nexus API.
 */
class NormalizedValueToRawValueEvent implements StoppableEvent {
  private rawValue: unknown = null;
  private propagationStopped: boolean = false;

  constructor(private normalizedValue: unknown) {}

  /**
   * @inheritDoc
   */
  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }

  /**
   * @inheritDoc
   */
  stopPropagation(): NormalizedValueToRawValueEvent {
    this.propagationStopped = true;
    return this;
  }

  /**
   * Returns the normalized data set during the event's creation.
   */
  getNormalizedValue(): unknown {
    return this.normalizedValue;
  }

  /**
   * Returns the raw value which Ember Nexus API can understand.
   */
  getRawValue(): unknown {
    return this.rawValue;
  }

  /**
   * Sets the raw value which Ember Nexus API can understand.
   * @param rawValue Raw value.
   */
  setRawValue(rawValue: unknown): NormalizedValueToRawValueEvent {
    this.rawValue = rawValue;
    return this;
  }
}

export { NormalizedValueToRawValueEvent };
