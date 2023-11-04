import jsonToElement from './jsonToElement.js';
import Node from '../Type/Node.js';
import PartialUnifiedCollection from '../Type/PartialUnifiedCollection.js';
import Relation from '../Type/Relation.js';

export default function jsonToPartialUnifiedCollection(data: Record<string, unknown>): PartialUnifiedCollection {
  if (!Object.getOwnPropertyDescriptor(data, 'type')) {
    throw new Error("Data object does not contain property with name 'type'.");
  }
  if (data.type !== '_PartialUnifiedCollection') {
    throw new Error("Data object is not of type '_PartialUnifiedCollection'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'id')) {
    throw new Error("Data object does not contain property with name 'id'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'totalElements')) {
    throw new Error("Data object does not contain property with name 'totalElements'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'links')) {
    throw new Error("Data object does not contain property with name 'links'.");
  }
  const links = <Record<string, string>>data.links;
  if (!Object.getOwnPropertyDescriptor(links, 'first')) {
    throw new Error("Data object does not contain property with name 'links.first'.");
  }
  if (!Object.getOwnPropertyDescriptor(links, 'previous')) {
    throw new Error("Data object does not contain property with name 'links.previous'.");
  }
  if (!Object.getOwnPropertyDescriptor(links, 'next')) {
    throw new Error("Data object does not contain property with name 'links.next'.");
  }
  if (!Object.getOwnPropertyDescriptor(links, 'last')) {
    throw new Error("Data object does not contain property with name 'links.last'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'elements')) {
    throw new Error("Data object does not contain property with name 'elements'.");
  }
  const rawElements = <Array<Record<string, unknown>>>data.elements;
  const elements: Array<Node | Relation> = [];
  for (let i = 0; i < rawElements.length; i++) {
    elements.push(jsonToElement(rawElements[i]));
  }
  return {
    type: '_PartialUnifiedCollection',
    id: <string>data.id,
    totalElements: <number>data.totalElements,
    links: {
      first: links.first,
      previous: links.previous,
      next: links.next,
      last: links.last,
    },
    elements: elements,
  };
}
