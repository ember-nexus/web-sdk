import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

class NormalizedValueToRawValueEvent implements StoppableEvent {
  private rawValue: unknown;
  private propagationStopped: boolean = false;

  constructor(private normalizedValue: unknown) {}

  isPropagationStopped(): boolean {
    return this.propagationStopped;
  }
  stopPropagation(): NormalizedValueToRawValueEvent {
    this.propagationStopped = true;
    return this;
  }

  getNormalizedValue(): unknown {
    return this.normalizedValue;
  }

  getRawValue(): unknown {
    return this.rawValue;
  }

  setRawValue(rawValue: unknown): NormalizedValueToRawValueEvent {
    this.rawValue = rawValue;
    return this;
  }
}

export { NormalizedValueToRawValueEvent };
