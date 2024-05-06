import { Service } from 'typedi';

import { EventManager } from '~/EventSystem/EventManager';
import { NormalizedValueToRawValueEvent } from '~/EventSystem/NormalizedValueToRawValue/Event/NormalizedValueToRawValueEvent';
import { DateTimeNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/DateTimeNormalizedValueToRawValueEventListener';
import { GenericNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/GenericNormalizedValueToRawValueEventListener';

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
