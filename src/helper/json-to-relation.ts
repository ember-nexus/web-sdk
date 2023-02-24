import { Relation } from '../type/relation.js';

export async function jsonToRelation(data: any): Promise<Relation> {
  return new Promise(function (resolve, reject) {
    if (!Object.getOwnPropertyDescriptor(data, 'type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'start')) {
      reject(new Error("Data object does not contain property with name 'start'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'end')) {
      reject(new Error("Data object does not contain property with name 'end'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'data')) {
      reject(new Error("Data object does not contain property with name 'data'"));
    }
    const relation: Relation = {
      type: String(data.type),
      id: data.id,
      start: data.start,
      end: data.end,
      data: data.data,
    };
    resolve(relation);
  });
}
