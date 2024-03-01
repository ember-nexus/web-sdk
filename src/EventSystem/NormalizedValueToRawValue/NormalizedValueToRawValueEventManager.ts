import { Service } from 'typedi';

import { EventManager } from '~/EventSystem/EventManager';
import { DateTimeNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/DateTimeNormalizedValueToRawValueEventListener';
import { GenericNormalizedValueToRawValueEventListener } from '~/EventSystem/NormalizedValueToRawValue/EventListener/GenericNormalizedValueToRawValueEventListener';

@Service()
class NormalizedValueToRawValueEventManager extends EventManager {
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
