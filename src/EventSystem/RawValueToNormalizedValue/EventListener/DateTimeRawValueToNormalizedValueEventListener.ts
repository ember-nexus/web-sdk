import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { EventListener } from '~/Type/Definition/EventListener';

/**
 * Checks if a string returned by Ember Nexus API matches the date time format and tries to convert it to a date object.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class DateTimeRawValueToNormalizedValueEventListener implements EventListener<RawValueToNormalizedValueEvent> {
  static readonly dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

  triggerOnEvent(event: RawValueToNormalizedValueEvent): void {
    const rawValue = event.getRawValue();
    if (typeof rawValue !== 'string') {
      return;
    }
    if (!DateTimeRawValueToNormalizedValueEventListener.dateRegex.test(rawValue)) {
      return;
    }
    const normalizedValue = new Date(rawValue);
    event.setNormalizedValue(normalizedValue);
    event.stopPropagation();
  }
}

export { DateTimeRawValueToNormalizedValueEventListener };
