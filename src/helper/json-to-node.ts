import { Node } from '../type/node.js';

export function jsonToNode(data: Record<string, unknown>): Node {
  if (!Object.getOwnPropertyDescriptor(data, 'type')) {
    throw new Error("Data object does not contain property with name 'type'");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'id')) {
    throw new Error("Data object does not contain property with name 'id'");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'data')) {
    throw new Error("Data object does not contain property with name 'data'");
  }
  return {
    type: String(data.type),
    id: data.id,
    data: <Record<string, unknown>>data.data,
  };
}
