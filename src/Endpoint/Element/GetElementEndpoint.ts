import { Service } from 'typedi';
import type { v4 as uuidv4 } from 'uuid';

import { LoggerInterface } from '~/Type/Definition/LoggerInterface';
import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';
import { SdkConfigurationInterface } from '~/Type/Definition/SdkConfigurationInterface';

@Service()
class GetElementEndpoint {
  constructor(
    private logger: LoggerInterface,
    private sdkConfiguration: SdkConfigurationInterface,
  ) {}

  async getElement(uuid: uuidv4): Promise<Node | Relation> {
    this.logger.debug('test');
    console.log(this.sdkConfiguration);
    console.log(uuid);
    return new Promise((resolve) => {
      resolve({
        type: 'test',
        id: '',
        data: {},
      });
    });
  }
}

export default GetElementEndpoint;
