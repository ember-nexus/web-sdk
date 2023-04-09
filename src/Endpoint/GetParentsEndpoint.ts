import { AxiosError, default as axios } from 'axios';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';

import LoggerInterface from '../Type/LoggerInterface.js';
import OptionsInterface from '../Type/OptionsInterface.js';
import PartialCollection from '../Type/PartialCollection.js';
import axiosErrorToSummaryObject from '../Util/axiosErrorToSummaryObject.js';
import jsonToPartialCollection from '../Util/jsonToPartialCollection.js';

@Service()
class GetParentsEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async getParents(uuid: typeof uuidv4, page = 1, pageSize: null | number = null): Promise<PartialCollection> {
    uuid = uuid.toString();
    if (pageSize === null) {
      pageSize = this.options.getPageSize();
    }
    return new Promise((resolve, reject) => {
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = this.options.getToken();
      }
      axios
        .get(`${this.options.getApiHost()}${uuid}/parents?page=${page}&pageSize=${pageSize}`, {
          headers: headers,
        })
        .then((response) => {
          const collection = jsonToPartialCollection(response.data);
          this.logger.debug(`Loaded parents from child with identifier ${uuid}.`, {
            page: page,
            pageSize: pageSize,
            collection: collection,
          });
          resolve(collection);
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
            error.message = `Encountered error while loading parents from child with identifier ${uuid}: ${messageDetail}`;
            this.logger.error(error.message, axiosErrorToSummaryObject(error));
          } else {
            error.message = `Encountered error while loading parents from child with identifier ${uuid}: ${error.message}`;
            this.logger.error(error);
          }
          reject(error);
        });
    });
  }
}

export default GetParentsEndpoint;
