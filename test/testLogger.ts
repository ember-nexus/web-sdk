import { Logger } from 'tslog';

import LoggerInterface from '../src/Type/LoggerInterface.js';

const testLogger = new Logger({
  name: 'eon-sdk',
  // type: "json"
  type: 'pretty',
});
// testLogger.settings.minLevel = 2;
testLogger.settings.minLevel = 6;

export default testLogger as LoggerInterface | typeof testLogger;
