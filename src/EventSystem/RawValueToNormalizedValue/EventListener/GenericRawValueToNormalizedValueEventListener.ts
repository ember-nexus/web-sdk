import { Service } from 'typedi';

import { EventListener } from '../../../Type/Definition/EventListener';
import { RawValueToNormalizedValueEvent } from '../Event';

/**
 * Skips conversion of primitive data types and sets them directly.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class GenericRawValueToNormalizedValueEventListener implements EventListener<RawValueToNormalizedValueEvent> {
  triggerOnEvent(event: RawValueToNormalizedValueEvent): void {
    const rawValue = event.getRawValue();
    if (
      Array.isArray(rawValue) ||
      typeof rawValue === 'number' ||
      typeof rawValue === 'boolean' ||
      typeof rawValue === 'string' ||
      rawValue === null
    ) {
      event.setNormalizedValue(rawValue);
      event.stopPropagation();
    }
  }
}

export { GenericRawValueToNormalizedValueEventListener };
