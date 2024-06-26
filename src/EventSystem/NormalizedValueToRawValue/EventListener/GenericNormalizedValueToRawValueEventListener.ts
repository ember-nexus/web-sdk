import { Service } from 'typedi';

import { EventListener } from '../../../Type/Definition/index.js';
import { NormalizedValueToRawValueEvent } from '../Event/index.js';

/**
 * Skips conversion of primitive data types and sets them directly.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class GenericNormalizedValueToRawValueEventListener implements EventListener<NormalizedValueToRawValueEvent> {
  triggerOnEvent(event: NormalizedValueToRawValueEvent): void {
    const normalizedValue = event.getNormalizedValue();
    if (
      Array.isArray(normalizedValue) ||
      typeof normalizedValue === 'number' ||
      typeof normalizedValue === 'boolean' ||
      typeof normalizedValue === 'string' ||
      normalizedValue === null
    ) {
      event.setRawValue(normalizedValue);
      event.stopPropagation();
    }
  }
}

export { GenericNormalizedValueToRawValueEventListener };
