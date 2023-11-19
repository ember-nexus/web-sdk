import { DateTime } from 'luxon';
import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { NormalizedValueToRawValueEventManager } from '~/EventSystem/NormalizedValueToRawValue/NormalizedValueToRawValueEventManager';
import { EventListener } from '~/Type/Definition/EventListener';

@Service()
class DateTimeNormalizedValueToRawValueEventListener implements EventListener {
  constructor(normalizedValueToRawValueEventManager: NormalizedValueToRawValueEventManager) {
    normalizedValueToRawValueEventManager.registerEventListener(this, 1);
  }

  triggerOnEvent(event: NormalizedValueToRawValueEvent): void {
    const normalizedValue = event.getNormalizedValue();
    if (!(normalizedValue instanceof Date)) {
      return;
    }
    const rawValue = DateTime.fromJSDate(normalizedValue).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
    event.setRawValue(rawValue);
    event.stopPropagation();
  }
}

export { DateTimeNormalizedValueToRawValueEventListener };
