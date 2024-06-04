import { Service } from 'typedi';

import { Logger } from './Logger.js';
import { RawValueToNormalizedValueEvent } from '../EventSystem/RawValueToNormalizedValue/Event/index.js';
import { RawValueToNormalizedValueEventManager } from '../EventSystem/RawValueToNormalizedValue/index.js';
import { Data } from '../Type/Definition/index.js';

/**
 * Class which helps to parse values.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class RawValueToNormalizedValueHelper {
  constructor(
    private logger: Logger,
    private rawValueToNormalizedValueEventManager: RawValueToNormalizedValueEventManager,
  ) {}

  parseRawData(rawData: Data): Data {
    const data: Data = {};
    for (const key in rawData) {
      const event = new RawValueToNormalizedValueEvent(rawData[key]);
      this.rawValueToNormalizedValueEventManager.handleEvent(event);
      if (!event.isPropagationStopped()) {
        this.logger.warn('Unable to normalize the following data property.', { key: key, data: rawData[key] });
        continue;
      }
      data[key] = event.getNormalizedValue();
    }

    return data;
  }
}

export { RawValueToNormalizedValueHelper };
