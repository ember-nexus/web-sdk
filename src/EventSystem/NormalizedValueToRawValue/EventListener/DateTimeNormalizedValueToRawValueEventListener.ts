import { DateTime } from 'luxon';
import { Service } from 'typedi';

import { EventListener } from '../../../Type/Definition/index.js';
import { NormalizedValueToRawValueEvent } from '../Event/index.js';

/**
 * Converts JavaScript date objects to the time representation Ember Nexus API can understand.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
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
