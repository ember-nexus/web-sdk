import 'reflect-metadata';

import { Container, Service } from 'typedi';

import { Logger } from '~/Service/Logger';

@Service()
class TestService {
  constructor(public logger: Logger) {}

  test(): void {
    this.logger.debug('level is debug');
    this.logger.info('level is info');
    this.logger.warn('level is warn');
    this.logger.error('level is error');
  }
}

export { TestService };

const service = Container.get(TestService);
service.test();
