import { Logger } from 'tslog';

import type { LoggerInterface } from '~/Type/Definition/LoggerInterface';

const testLogger = new Logger({
  name: 'web-sdk',
  // type: "json"
  type: 'pretty',
});
// testLogger.settings.minLevel = 2;
testLogger.settings.minLevel = 6;

export default testLogger as LoggerInterface | typeof testLogger;
