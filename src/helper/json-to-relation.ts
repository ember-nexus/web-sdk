import { Relation } from '../type/relation.js';

export function jsonToRelation(data: Record<string, unknown>): Relation {
  if (!Object.getOwnPropertyDescriptor(data, 'type')) {
    throw new Error("Data object does not contain property with name 'type'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'id')) {
    throw new Error("Data object does not contain property with name 'id'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'start')) {
    throw new Error("Data object does not contain property with name 'start'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'end')) {
    throw new Error("Data object does not contain property with name 'end'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'data')) {
    throw new Error("Data object does not contain property with name 'data'.");
  }
  return {
    type: String(data.type),
    id: data.id,
    start: data.start,
    end: data.end,
    data: <Record<string, unknown>>data.data,
  };
}
