import { ILogObj, Logger as TsLogger } from 'tslog';
import { Service } from 'typedi';

import { LoggerFactory } from '../Factory/index.js';
import { LoggerInterface } from '../Type/Definition/index.js';

/**
 * Default logger.
 */
@Service({ factory: [LoggerFactory, 'create'] })
class Logger implements LoggerInterface {
  private logger: TsLogger<ILogObj>;
  constructor(logger: TsLogger<ILogObj>) {
    this.logger = logger;
  }

  debug(...args: unknown[]): unknown | undefined {
    return this.logger.debug(args);
  }

  error(...args: unknown[]): unknown | undefined {
    return this.logger.error(args);
  }

  info(...args: unknown[]): unknown | undefined {
    return this.logger.info(args);
  }

  warn(...args: unknown[]): unknown | undefined {
    return this.logger.warn(args);
  }
}

export { Logger };
