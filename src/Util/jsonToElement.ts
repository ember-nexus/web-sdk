import jsonToNode from './jsonToNode.js';
import jsonToRelation from './jsonToRelation.js';
import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

export default function jsonToElement(data: Record<string, unknown>): Node | Relation {
  if (Object.getOwnPropertyDescriptor(data, 'start') || Object.getOwnPropertyDescriptor(data, 'end')) {
    return jsonToRelation(data);
  }
  return jsonToNode(data);
}
