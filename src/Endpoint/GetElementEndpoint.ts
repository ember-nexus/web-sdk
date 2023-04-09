import { AxiosError, default as axios } from 'axios';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';

import LoggerInterface from '../Type/LoggerInterface.js';
import Node from '../Type/Node.d.js';
import OptionsInterface from '../Type/OptionsInterface.js';
import Relation from '../Type/Relation.d.js';
import axiosErrorToSummaryObject from '../Util/axiosErrorToSummaryObject.js';
import jsonToElement from '../Util/jsonToElement.js';

@Service()
class GetElementEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
    return new Promise((resolve, reject) => {
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = this.options.getToken();
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
          if (error instanceof AxiosError) {
            let messageDetail = error.message;
            try {
              if (error.response) {
                if (error.response.headers['content-type'] === 'application/problem+json') {
                  messageDetail = `${error.response.data.title} - ${error.response.data.detail}`;
                }
              }
            } catch (error) {
              this.logger.error(`Encountered error while building error message: ${error.message}`);
            }
            error.message = `Encountered error while loading element with identifier ${uuid}: ${messageDetail}`;
            this.logger.error(error.message, axiosErrorToSummaryObject(error));
          } else {
            error.message = `Encountered error while loading element with identifier ${uuid}: ${error.message}`;
            this.logger.error(error);
          }
          reject(error);
        });
    });
  }
}

export default GetElementEndpoint;
