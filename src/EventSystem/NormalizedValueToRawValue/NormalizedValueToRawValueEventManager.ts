import { Service } from 'typedi';

import { EventManager } from '~/EventSystem/EventManager';

@Service()
class NormalizedValueToRawValueEventManager extends EventManager {}

export { NormalizedValueToRawValueEventManager };
