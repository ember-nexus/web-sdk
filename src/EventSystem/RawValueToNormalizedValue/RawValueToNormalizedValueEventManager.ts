import { Service } from 'typedi';

import { EventManager } from '~/EventSystem/EventManager';

@Service()
class RawValueToNormalizedValueEventManager extends EventManager {}

export { RawValueToNormalizedValueEventManager };
