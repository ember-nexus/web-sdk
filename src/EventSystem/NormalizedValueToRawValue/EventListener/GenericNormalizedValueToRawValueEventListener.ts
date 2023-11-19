import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { NormalizedValueToRawValueEventManager } from '~/EventSystem/NormalizedValueToRawValue/NormalizedValueToRawValueEventManager';
import { EventListener } from '~/Type/Definition/EventListener';

@Service()
class GenericNormalizedValueToRawValueEventListener implements EventListener {
  constructor(normalizedValueToRawValueEventManager: NormalizedValueToRawValueEventManager) {
    normalizedValueToRawValueEventManager.registerEventListener(this, 0);
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

export { GenericNormalizedValueToRawValueEventListener };
