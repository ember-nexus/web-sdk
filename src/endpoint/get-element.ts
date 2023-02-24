import axios, { AxiosError } from 'axios';
import { Node } from '../type/node.d.js';
import { Relation } from '../type/relation.d.js';
import { v4 as uuidv4 } from 'uuid';
import { Options } from '../options.js';
import { jsonToElement } from '../helper/json-to-element.js';
import { logger } from '../logger.js';
import { axiosErrorToSummaryObject } from '../helper/axios-error-to-summary-object.js';

export async function getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
  return new Promise(function (resolve, reject) {
    const options = Options.getInstance();
    uuid = uuid.toString();
    axios
      .get(`${options.apiHost}${uuid}`)
      .then(async function (response) {
        await jsonToElement(response.data)
          .then((element) => {
            logger.debug(`Loaded element with identifier ${uuid}`, element);
            resolve(element);
          })
          .catch((rejectObject) => {
            logger.error(rejectObject);
            reject(rejectObject);
          });
      })
      .catch(function (error: AxiosError) {
        logger.error(error.message, axiosErrorToSummaryObject(error));
        reject(error);
      });
  });
}
