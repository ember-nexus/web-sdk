import { Node } from '../type/node.js';
import { PartialCollection } from '../type/partial-collection.js';
import { jsonToNode } from './json-to-node.js';
import { jsonToRelation } from './json-to-relation.js';
import { Relation } from '../type/relation.js';

export async function jsonToPartialCollection(data: any): Promise<PartialCollection> {
  return new Promise(async function (resolve, reject) {
    if (!Object.getOwnPropertyDescriptor(data, 'type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (data.type !== '_PartialCollection') {
      reject(new Error("Data object is not of type '_PartialCollection'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'totalNodes')) {
      reject(new Error("Data object does not contain property with name 'totalNodes'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'links')) {
      reject(new Error("Data object does not contain property with name 'links'"));
    }
    if (!Object.getOwnPropertyDescriptor(data.links, 'first')) {
      reject(new Error("Data object does not contain property with name 'links.first'"));
    }
    if (!Object.getOwnPropertyDescriptor(data.links, 'previous')) {
      reject(new Error("Data object does not contain property with name 'links.previous'"));
    }
    if (!Object.getOwnPropertyDescriptor(data.links, 'next')) {
      reject(new Error("Data object does not contain property with name 'links.next'"));
    }
    if (!Object.getOwnPropertyDescriptor(data.links, 'last')) {
      reject(new Error("Data object does not contain property with name 'links.last'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'nodes')) {
      reject(new Error("Data object does not contain property with name 'nodes'"));
    }
    if (!Object.getOwnPropertyDescriptor(data, 'relations')) {
      reject(new Error("Data object does not contain property with name 'relations'"));
    }
    const nodes: Node[] = [];
    for (let i = 0; i < data.nodes.length; i++) {
      await jsonToNode(data.nodes[i])
        .then((nodeElement) => {
          nodes.push(nodeElement);
        })
        .catch((rejectObject: Error) => {
          reject(new Error(`Error returned for node ${i + 1} of data object: ${rejectObject.message}`));
        });
    }
    const relations: Relation[] = [];
    for (let i = 0; i < data.relations.length; i++) {
      await jsonToRelation(data.relations[i])
        .then((relationElement) => {
          relations.push(relationElement);
        })
        .catch((rejectObject: Error) => {
          reject(new Error(`Error returned for relation ${i + 1} of data object: ${rejectObject.message}`));
        });
    }
    const partialCollection: PartialCollection = {
      type: '_PartialCollection',
      id: data.id,
      totalNodes: data.totalNodes,
      links: {
        first: data.links.first,
        previous: data.links.previous,
        next: data.links.next,
        last: data.links.last,
      },
      nodes: nodes,
      relations: relations,
    };
    resolve(partialCollection);
  });
}
