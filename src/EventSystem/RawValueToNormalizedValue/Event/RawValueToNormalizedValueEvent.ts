import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

class RawValueToNormalizedValueEvent implements StoppableEvent {
  private normalizedValue: unknown;
  private propagationStopped: boolean = false;

  constructor(private rawValue: unknown) {}

  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }
  stopPropagation(): RawValueToNormalizedValueEvent {
    this.propagationStopped = true;
    return this;
  }

  getRawValue(): unknown {
    return this.rawValue;
  }

  getNormalizedValue(): unknown {
    return this.normalizedValue;
  }

  setNormalizedValue(normalizedValue: unknown): RawValueToNormalizedValueEvent {
    this.normalizedValue = normalizedValue;
    return this;
  }
}

export { RawValueToNormalizedValueEvent };
