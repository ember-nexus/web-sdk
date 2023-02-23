import axios from 'axios';
import { Node } from '../type/node.d.js';
import { Relation } from '../type/relation.d.js';
import { v4 as uuidv4 } from 'uuid';
import { Options } from '../options.js';
import { jsonToElement } from '../helper/json-to-element.js';

export async function getElement(uuid: typeof uuidv4): Promise<Node | Relation> {
  return new Promise(function (resolve, reject) {
    const options = Options.getInstance();
    axios
      .get(`${options.apiHost}${uuid.toString()}`)
      .then(async function (response) {
        const data = response.data;
        const element = await jsonToElement(data).then((element) => {
          return element;
        });
        resolve(element);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
