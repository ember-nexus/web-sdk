import { AxiosError, default as axios } from 'axios';

import LoggerInterface from '../Type/LoggerInterface.js';
import OptionsInterface from '../Type/OptionsInterface.js';
import PartialUnifiedCollection from '../Type/PartialUnifiedCollection.js';
import axiosErrorToSummaryObject from '../Util/axiosErrorToSummaryObject.js';
import jsonToPartialUnifiedCollection from '../Util/jsonToPartialUnifiedCollection.js';

class SearchEndpoint {
  constructor(private logger: LoggerInterface, private options: OptionsInterface) {}

  async search(
    payload: Record<string, unknown>,
    page = 1,
    pageSize: null | number = null,
  ): Promise<PartialUnifiedCollection> {
    if (pageSize === null) {
      pageSize = this.options.getPageSize();
    }
    return new Promise((resolve, reject) => {
      const headers = {};
      if (this.options.isLoggedIn()) {
        headers['Authorization'] = `Bearer ${this.options.getToken()}`;
      }
      axios
        .post(`${this.options.getApiHost()}search?page=${page}&pageSize=${pageSize}`, payload, {
          headers: headers,
        })
        .then((response) => {
          const collection = jsonToPartialUnifiedCollection(response.data);
          this.logger.debug(`Loaded search.`, {
            payload: payload,
            page: page,
            pageSize: pageSize,
            collection: collection,
          });
          resolve(collection);
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
            error.message = `Encountered error while loading search: ${messageDetail}`;
            this.logger.error(error.message, axiosErrorToSummaryObject(error));
          } else {
            error.message = `Encountered error while loading search: ${error.message}`;
            this.logger.error(error);
          }
          reject(error);
        });
    });
  }
}

export default SearchEndpoint;
