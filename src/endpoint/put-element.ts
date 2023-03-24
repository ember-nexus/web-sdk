import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Options } from '../options.js';

export async function putElement(uuid: typeof uuidv4, data: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = Options.getInstance();
    axios
      .put(`${options.apiHost}${uuid.toString()}`, data)
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
