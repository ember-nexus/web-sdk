import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import axiosErrorToSummaryObject from '../helper/axios-error-to-summary-object.js';
import logger from '../logger.js';
import Options from '../options.js';

export default async function putElement(uuid: typeof uuidv4, data: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = Options.getInstance();
    uuid = uuid.toString();
    axios
      .put(`${options.apiHost}${uuid}`, data)
      .then(function () {
        logger.debug(`Replaced data of element with identifier ${uuid}.`, data);
        resolve();
      })
      .catch(function (error: Error) {
        if (error instanceof AxiosError) {
          let messageDetail = error.message;
          try {
            if (error.response) {
              if (error.response.headers['content-type'] === 'application/problem+json') {
                messageDetail = `${error.response.data.title} - ${error.response.data.detail}`;
              }
            }
          } catch (error) {
            logger.error(`Encountered error while building error message: ${error.message}`);
          }
          error.message = `Encountered error while updating element with identifier ${uuid}: ${messageDetail}`;
          logger.error(error.message, axiosErrorToSummaryObject(error));
        } else {
          error.message = `Encountered error while updating element with identifier ${uuid}: ${error.message}`;
          logger.error(error);
        }
        reject(error);
      });
  });
}
