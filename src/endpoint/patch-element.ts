import { Options } from '../options.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function patchElement(uuid: typeof uuidv4, data: any): Promise<void> {
  return new Promise(function (resolve, reject) {
    const options = Options.getInstance();
    axios
      .patch(`${options.apiHost}${uuid.toString()}`, data)
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
