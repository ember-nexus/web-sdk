import { Node } from '../type/node.js';
import { Relation } from '../type/relation.js';
import { jsonToRelation } from './json-to-relation.js';
import { jsonToNode } from './json-to-node.js';

export function jsonToElement(data: Record<string, unknown>): Node | Relation {
  if (Object.getOwnPropertyDescriptor(data, 'start') || Object.getOwnPropertyDescriptor(data, 'end')) {
    return jsonToRelation(data);
  }
  return jsonToNode(data);
}
