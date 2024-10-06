import { Logger } from 'tslog';

import type { LoggerInterface } from '../src/Type/Definition';

const testLogger = new Logger({
  name: 'web-sdk',
  // type: "json"
  type: 'pretty',
}) as LoggerInterface | typeof testLogger;
// testLogger.settings.minLevel = 2;
testLogger.settings.minLevel = 6;

export { testLogger };
