import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from './Event';
import { DateTimeRawValueToNormalizedValueEventListener } from './EventListener';
import { GenericRawValueToNormalizedValueEventListener } from './EventListener';
import { EventManager } from '..';

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
