import { AxiosHeaders, default as axios } from 'axios';
import { Service } from 'typedi';
import type { v4 as uuidv4 } from 'uuid';

import { LoggerInterface } from '~/Type/Definition/LoggerInterface';
import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';
import { WebSdkConfigurationInterface } from '~/Type/Definition/WebSdkConfigurationInterface';

@Service()
class GetElementEndpoint {
  constructor(
    private logger: LoggerInterface,
    private sdkConfiguration: WebSdkConfigurationInterface,
  ) {}

  async getElement(uuid: uuidv4): Promise<Node | Relation> {
    return new Promise((_resolve, reject) => {
      const headers = new AxiosHeaders();
      if (this.sdkConfiguration.hasToken()) {
        headers.set('Authorization', `Bearer ${this.sdkConfiguration.getToken().token}`);
      }
      uuid = uuid.toString();

      this.logger.debug('just before axios request...');
      axios
        .get(`${this.sdkConfiguration.getApiHost()}${uuid}`, {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);
          // const element = jsonToElement(response.data);
          // this.logger.debug(`Loaded element with identifier ${uuid}.`, element);
          // resolve(element);
          reject('rejected because not implemented');
        })
        .catch((error) => {
          // const newError = handleEndpointError(
          //   `Encountered error while loading element with identifier ${uuid}`,
          //   error,
          // );
          // this.logger.error(newError.message, newError);
          // reject(newError);

          console.log(error);
          reject('rejected because not implemented');
        });
    });
  }
}

export default GetElementEndpoint;
