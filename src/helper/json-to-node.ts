import { Node } from '../type/node.js';

export async function jsonToNode(data: any): Promise<Node> {
  return new Promise(function (resolve, reject) {
    if (!Object.getOwnPropertyDescriptor(data, 'type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'data')) {
      reject(new Error("Data object does not contain property with name 'data'"));
    }
    const node: Node = {
      type: String(data.type),
      id: data.id,
      data: data.data,
    };
    resolve(node);
  });
}
