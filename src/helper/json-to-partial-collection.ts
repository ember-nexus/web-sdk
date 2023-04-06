import jsonToNode from './json-to-node.js';
import jsonToRelation from './json-to-relation.js';
import Node from '../type/node.js';
import PartialCollection from '../type/partial-collection.js';
import Relation from '../type/relation.js';

export default function jsonToPartialCollection(data: Record<string, unknown>): PartialCollection {
  if (!Object.getOwnPropertyDescriptor(data, 'type')) {
    throw new Error("Data object does not contain property with name 'type'.");
  }
  if (data.type !== '_PartialCollection') {
    throw new Error("Data object is not of type '_PartialCollection'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'id')) {
    throw new Error("Data object does not contain property with name 'id'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'totalNodes')) {
    throw new Error("Data object does not contain property with name 'totalNodes'.");
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
  if (!Object.getOwnPropertyDescriptor(data, 'nodes')) {
    throw new Error("Data object does not contain property with name 'nodes'.");
  }
  if (!Object.getOwnPropertyDescriptor(data, 'relations')) {
    throw new Error("Data object does not contain property with name 'relations'.");
  }
  const rawNodes = <Array<Record<string, unknown>>>data.nodes;
  const nodes: Node[] = [];
  for (let i = 0; i < rawNodes.length; i++) {
    nodes.push(jsonToNode(rawNodes[i]));
  }
  const rawRelations = <Array<Record<string, unknown>>>data.relations;
  const relations: Relation[] = [];
  for (let i = 0; i < rawRelations.length; i++) {
    relations.push(jsonToRelation(rawRelations[i]));
  }
  return {
    type: '_PartialCollection',
    id: <string>data.id,
    totalNodes: <number>data.totalNodes,
    links: {
      first: links.first,
      previous: links.previous,
      next: links.next,
      last: links.last,
    },
    nodes: nodes,
    relations: relations,
  };
}
