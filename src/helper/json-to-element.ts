import { Node } from '../type/node.js';
import { Relation } from '../type/relation.js';
import { jsonToRelation } from './json-to-relation.js';
import { jsonToNode } from './json-to-node.js';

export async function jsonToElement(data: any): Promise<Node | Relation> {
  if (Object.getOwnPropertyDescriptor(data, 'start') || Object.getOwnPropertyDescriptor(data, 'end')) {
    return await jsonToRelation(data)
      .then((relation) => {
        return relation;
      })
      .catch((rejectObject) => {
        throw rejectObject;
      });
  }
  return await jsonToNode(data)
    .then((node) => {
      return node;
    })
    .catch((rejectObject) => {
      throw rejectObject;
    });
}
