import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { axiosErrorToSummaryObject } from '../helper/axios-error-to-summary-object.js';
import { logger } from '../logger.js';
import { Options } from '../options.js';

export async function deleteElement(uuid: typeof uuidv4): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = Options.getInstance();
    uuid = uuid.toString();
    axios
      .delete(`${options.apiHost}${uuid}`)
      .then(function () {
        logger.debug(`Deleted element with identifier ${uuid}.`);
        resolve();
      })
      .catch(function (error: AxiosError) {
        logger.error(error.message, axiosErrorToSummaryObject(error));
        reject(error);
      });
  });
}
