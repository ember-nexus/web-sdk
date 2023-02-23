import { Node } from '../type/node.js';

export async function jsonToNode(data: any): Promise<Node> {
  return new Promise(function (resolve, reject) {
    if (!data.hasOwnProperty('type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (!data.hasOwnProperty('id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!data.hasOwnProperty('data')) {
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
