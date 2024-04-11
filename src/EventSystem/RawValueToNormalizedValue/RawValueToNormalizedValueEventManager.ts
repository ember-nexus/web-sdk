import { Service } from 'typedi';

import { EventManager } from '~/EventSystem/EventManager';
import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { DateTimeRawValueToNormalizedValueEventListener } from '~/EventSystem/RawValueToNormalizedValue/EventListener/DateTimeRawValueToNormalizedValueEventListener';
import { GenericRawValueToNormalizedValueEventListener } from '~/EventSystem/RawValueToNormalizedValue/EventListener/GenericRawValueToNormalizedValueEventListener';

/**
 * Event manager for RawValueToNormalizedValueEvent.
 */
@Service()
class RawValueToNormalizedValueEventManager extends EventManager<RawValueToNormalizedValueEvent> {
  constructor(
    dateTimeRawValueToNormalizedValueEventListener: DateTimeRawValueToNormalizedValueEventListener,
    genericRawValueToNormalizedValueEventListener: GenericRawValueToNormalizedValueEventListener,
  ) {
    super();
    this.registerEventListener(genericRawValueToNormalizedValueEventListener, 0);
    this.registerEventListener(dateTimeRawValueToNormalizedValueEventListener, 1);
  }
}

export { RawValueToNormalizedValueEventManager };
