import { Options } from '../options.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PartialCollection } from '../type/partial-collection.js';
import { jsonToPartialCollection } from '../helper/json-to-partial-collection.js';

export async function getRelated(
  uuid: typeof uuidv4,
  page = 1,
  pageSize: null | number = null,
): Promise<PartialCollection> {
  const options = Options.getInstance();
  if (pageSize === null) {
    pageSize = options.pageSize;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${options.apiHost}${uuid.toString()}/related?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        resolve(jsonToPartialCollection(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
