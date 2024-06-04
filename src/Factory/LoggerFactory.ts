import { ILogObj, Logger as TsLogger } from 'tslog';
import { Service } from 'typedi';

import { Logger } from '../Service/index.js';
import { LogLevel } from '../Type/Enum/index.js';

/**
 * Factory for creating the default logger.
 */
@Service()
class LoggerFactory {
  create(): Logger {
    const tsLogger: TsLogger<ILogObj> = new TsLogger({
      minLevel: LogLevel.Debug,
      stylePrettyLogs: false,
    });
    return new Logger(tsLogger);
  }
}

export { LoggerFactory };
