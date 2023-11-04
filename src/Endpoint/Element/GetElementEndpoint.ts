import type { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';

import {LoggerInterface} from '../../Type/Definition/LoggerInterface.js';
import {Node} from '../../Type/Definition/Node.d.js';
import {Relation} from '../../Type/Definition/Relation.d.js';
import {SdkConfigurationInterface} from "../../Type/Definition/SdkConfigurationInterface.js";

@Service()
class GetElementEndpoint {
  constructor(
    private logger: LoggerInterface,
    private sdkConfiguration: SdkConfigurationInterface
  ) {}

  async getElement(uuid: uuidv4): Promise<Node | Relation> {
    this.logger.debug("test");
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
