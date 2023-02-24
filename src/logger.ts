import { Logger } from 'tslog';

const logger = new Logger({
  name: 'eon-sdk',
  // type: "json"
  type: 'pretty',
});
logger.settings.minLevel = 2;
// logger.settings.minLevel = 6;

export { logger };
