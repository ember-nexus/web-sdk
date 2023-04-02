import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { axiosErrorToSummaryObject } from '../helper/axios-error-to-summary-object.js';
import { logger } from '../logger.js';
import { Options } from '../options.js';

export async function putElement(uuid: typeof uuidv4, data: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = Options.getInstance();
    uuid = uuid.toString();
    axios
      .put(`${options.apiHost}${uuid}`, data)
      .then(function () {
        logger.debug(`Replaced element data with identifier ${uuid}.`, data);
        resolve();
      })
      .catch(function (error: AxiosError) {
        logger.error(error.message, axiosErrorToSummaryObject(error));
        reject(error);
      });
  });
}
