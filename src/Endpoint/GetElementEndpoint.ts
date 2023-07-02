import { default as axios } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import LoggerInterface from '../Type/LoggerInterface.js';
import Node from '../Type/Node.d.js';
import OptionsInterface from '../Type/OptionsInterface.js';
import Relation from '../Type/Relation.d.js';
import handleEndpointError from '../Util/handleEndpointError.js';
import jsonToElement from '../Util/jsonToElement.js';

class GetElementEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
    return new Promise((resolve, reject) => {
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = `Bearer ${this.options.getToken()}`;
      }
      uuid = uuid.toString();
      axios
        .get(`${this.options.getApiHost()}${uuid}`, {
          headers: headers,
        })
        .then((response) => {
          const element = jsonToElement(response.data);
          this.logger.debug(`Loaded element with identifier ${uuid}.`, element);
          resolve(element);
        })
        .catch((error) => {
          const newError = handleEndpointError(
            `Encountered error while loading element with identifier ${uuid}`,
            error,
          );
          this.logger.error(newError.message, newError);
          reject(newError);
        });
    });
  }
}

export default GetElementEndpoint;
