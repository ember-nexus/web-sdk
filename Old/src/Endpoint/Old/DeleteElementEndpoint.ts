import { AxiosError, default as axios } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import LoggerInterface from '../Type/LoggerInterface.js';
import OptionsInterface from '../Type/OptionsInterface.js';

class DeleteElementEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async deleteElement(uuid: typeof uuidv4): Promise<void> {
    return new Promise((resolve, reject) => {
      uuid = uuid.toString();
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = `Bearer ${this.options.getToken()}`;
      }
      axios
        .delete(`${this.options.getApiHost()}${uuid}`, {
          headers: headers,
        })
        .then(() => {
          this.logger.debug(`Deleted element with identifier ${uuid}.`);
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
            const newError = Object.assign({}, error);
            newError.message = `Encountered error while deleting element with identifier ${uuid}: ${messageDetail}`;
            this.logger.error(newError);
          } else {
            const newError = Object.assign({}, error);
            newError.message = `Encountered error while deleting element with identifier ${uuid}: ${error.message}`;
            this.logger.error(newError);
          }
          reject(error);
        });
    });
  }
}

export default DeleteElementEndpoint;
