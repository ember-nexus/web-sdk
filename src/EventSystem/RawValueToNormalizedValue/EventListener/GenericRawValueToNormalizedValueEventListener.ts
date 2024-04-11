import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { EventListener } from '~/Type/Definition/EventListener';

/**
 * Skips conversion of primitive data types and sets them directly.
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
