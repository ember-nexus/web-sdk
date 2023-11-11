import { ILogObj, Logger as TsLogger } from 'tslog';
import { Service } from 'typedi';

import { Logger } from '~/Service/Logger';
import { LogLevelEnum } from '~/Type/Enum/LogLevelEnum';

@Service()
class LoggerFactory {
  create(): Logger {
    const tsLogger: TsLogger<ILogObj> = new TsLogger({
      minLevel: LogLevelEnum.Debug,
    });
    return new Logger(tsLogger);
  }
}

export { LoggerFactory };
