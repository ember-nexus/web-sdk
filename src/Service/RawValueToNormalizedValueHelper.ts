import { Service } from 'typedi';

import { RawValueToNormalizedValueEvent } from '~/EventSystem/RawValueToNormalizedValue/Event/RawValueToNormalizedValueEvent';
import { RawValueToNormalizedValueEventManager } from '~/EventSystem/RawValueToNormalizedValue/RawValueToNormalizedValueEventManager';
import { Logger } from '~/Service/Logger';
import { Data } from '~/Type/Definition/Data';

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
