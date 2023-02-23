import { Relation } from '../type/relation.js';

export async function jsonToRelation(data: any): Promise<Relation> {
  return new Promise(function (resolve, reject) {
    if (!data.hasOwnProperty('type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (!data.hasOwnProperty('id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!data.hasOwnProperty('start')) {
      reject(new Error("Data object does not contain property with name 'start'"));
    }
    if (!data.hasOwnProperty('end')) {
      reject(new Error("Data object does not contain property with name 'end'"));
    }
    if (!data.hasOwnProperty('data')) {
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
