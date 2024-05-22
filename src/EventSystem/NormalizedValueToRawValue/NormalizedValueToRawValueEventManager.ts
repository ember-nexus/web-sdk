import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from './Event';
import { DateTimeNormalizedValueToRawValueEventListener } from './EventListener';
import { GenericNormalizedValueToRawValueEventListener } from './EventListener';
import { EventManager } from '..';

/**
 * Event manager for NormalizedValueToRawValueEvent.
 */
@Service()
class NormalizedValueToRawValueEventManager extends EventManager<NormalizedValueToRawValueEvent> {
  constructor(
    dateTimeNormalizedValueToRawValueEventListener: DateTimeNormalizedValueToRawValueEventListener,
    genericNormalizedValueToRawValueEventListener: GenericNormalizedValueToRawValueEventListener,
  ) {
    super();
    this.registerEventListener(genericNormalizedValueToRawValueEventListener, 0);
    this.registerEventListener(dateTimeNormalizedValueToRawValueEventListener, 1);
  }
}

export { NormalizedValueToRawValueEventManager };
