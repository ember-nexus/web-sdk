import { AxiosError, default as axios } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import LoggerInterface from '../Type/LoggerInterface.js';
import OptionsInterface from '../Type/OptionsInterface.js';
import axiosErrorToSummaryObject from '../Util/axiosErrorToSummaryObject.js';

class PutElementEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async putElement(uuid: typeof uuidv4, data: Record<string, unknown>): Promise<void> {
    uuid = uuid.toString();
    return new Promise((resolve, reject) => {
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = this.options.getToken();
      }
      axios
        .put(`${this.options.getApiHost()}${uuid}`, data, {
          headers: headers,
        })
        .then(() => {
          this.logger.debug(`Replaced data of element with identifier ${uuid}.`, data);
          resolve();
        })
        .catch((error: Error) => {
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
            error.message = `Encountered error while updating element with identifier ${uuid}: ${messageDetail}`;
            this.logger.error(error.message, axiosErrorToSummaryObject(error));
          } else {
            error.message = `Encountered error while updating element with identifier ${uuid}: ${error.message}`;
            this.logger.error(error);
          }
          reject(error);
        });
    });
  }
}

export default PutElementEndpoint;
