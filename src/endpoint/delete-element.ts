import { Options } from '../options.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function deleteElement(uuid: typeof uuidv4): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = Options.getInstance();
    axios
      .delete(`${options.apiHost}${uuid.toString()}`)
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
