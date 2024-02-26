import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { RawValueToNormalizedValueEventManager } from '~/EventSystem/RawValueToNormalizedValue/RawValueToNormalizedValueEventManager';
import { EventListener } from '~/Type/Definition/EventListener';

@Service()
class GenericRawValueToNormalizedValueEventListener implements EventListener {
  constructor(rawValueToNormalizedValueEventManager: RawValueToNormalizedValueEventManager) {
    rawValueToNormalizedValueEventManager.registerEventListener(this, 0);
  }

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
