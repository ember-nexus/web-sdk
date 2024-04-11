import { DateTime } from 'luxon';
import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { EventListener } from '~/Type/Definition/EventListener';

/**
 * Converts JavaScript date objects to the time representation Ember Nexus API can understand.
 */
@Service()
class DateTimeNormalizedValueToRawValueEventListener implements EventListener<NormalizedValueToRawValueEvent> {
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
