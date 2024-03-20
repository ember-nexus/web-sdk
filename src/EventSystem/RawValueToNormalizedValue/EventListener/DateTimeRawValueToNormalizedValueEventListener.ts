import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { EventListener } from '~/Type/Definition/EventListener';

@Service()
class DateTimeRawValueToNormalizedValueEventListener implements EventListener {
  triggerOnEvent(event: RawValueToNormalizedValueEvent): void {
    const rawValue = event.getRawValue();
    if (typeof rawValue !== 'string') {
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;
    if (!dateRegex.test(rawValue)) {
      return;
    }
    const normalizedValue = new Date(rawValue);
    event.setNormalizedValue(normalizedValue);
    event.stopPropagation();
  }
}

export { DateTimeRawValueToNormalizedValueEventListener };
