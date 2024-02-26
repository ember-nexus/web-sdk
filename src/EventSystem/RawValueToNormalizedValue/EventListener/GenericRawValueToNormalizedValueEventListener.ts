import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { RawValueToNormalizedValueEventManager } from '~/EventSystem/RawValueToNormalizedValue/RawValueToNormalizedValueEventManager';
import { EventListener } from '~/Type/Definition/EventListener';

@Service()
class GenericRawValueToNormalizedValueEventListener implements EventListener {
  constructor(rawValueToNormalizedValueEventManager: RawValueToNormalizedValueEventManager) {
    rawValueToNormalizedValueEventManager.registerEventListener(this, 0);
  }

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

export { GenericRawValueToNormalizedValueEventListener };
