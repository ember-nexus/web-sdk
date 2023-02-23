import { Node } from '../type/node.js';
import { Relation } from '../type/relation.js';
import { jsonToRelation } from './json-to-relation.js';
import { jsonToNode } from './json-to-node.js';

export async function jsonToElement(data: any): Promise<Node | Relation> {
  return new Promise(async function (resolve, reject) {
    if (data.hasOwnProperty('start') || data.hasOwnProperty('end')) {
      await jsonToRelation(data)
        .then((relation) => {
          resolve(relation);
        })
        .catch((rejectObject) => {
          reject(rejectObject);
        });
    }
    await jsonToNode(data)
      .then((node) => {
        resolve(node);
      })
      .catch((rejectObject) => {
        reject(rejectObject);
      });
  });
}
