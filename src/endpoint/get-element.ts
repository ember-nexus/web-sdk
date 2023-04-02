import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { axiosErrorToSummaryObject } from '../helper/axios-error-to-summary-object.js';
import { jsonToElement } from '../helper/json-to-element.js';
import { logger } from '../logger.js';
import { Options } from '../options.js';
import { Node } from '../type/node.d.js';
import { Relation } from '../type/relation.d.js';

export async function getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
  return new Promise(function (resolve, reject) {
    const options = Options.getInstance();
    uuid = uuid.toString();
    axios
      .get(`${options.apiHost}${uuid}`)
      .then((response) => {
        const element = jsonToElement(response.data);
        logger.debug(`Loaded element with identifier ${uuid}.`, element);
        resolve(element);
      })
      .catch(function (error) {
        if (error instanceof AxiosError) {
          logger.error(error.message, axiosErrorToSummaryObject(error));
        } else {
          error.message = `Encountered error while loading element with identifier ${uuid}: ${error.message}`;
          logger.error(error);
        }
        reject(error);
      });
  });
}
