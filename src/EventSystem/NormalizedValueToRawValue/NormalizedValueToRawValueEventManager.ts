import { Service } from 'typedi';

import { NormalizedValueToRawValueEvent } from './Event/index.js';
import {
  DateTimeNormalizedValueToRawValueEventListener,
  GenericNormalizedValueToRawValueEventListener,
} from './EventListener/index.js';
import { EventManager } from '../EventManager.js';

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
