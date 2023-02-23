import { Node } from '../type/node.js';
import { PartialCollection } from '../type/partial-collection.js';
import { jsonToNode } from './json-to-node.js';
import { jsonToRelation } from './json-to-relation.js';
import { Relation } from '../type/relation.js';

export async function jsonToPartialCollection(data: any): Promise<PartialCollection> {
  return new Promise(async function (resolve, reject) {
    if (!data.hasOwnProperty('type')) {
      reject(new Error("Data object does not contain property with name 'type'"));
    }
    if (data.type !== '_PartialCollection') {
      reject(new Error("Data object is not of type '_PartialCollection'"));
    }
    if (!data.hasOwnProperty('id')) {
      reject(new Error("Data object does not contain property with name 'id'"));
    }
    if (!data.hasOwnProperty('totalNodes')) {
      reject(new Error("Data object does not contain property with name 'totalNodes'"));
    }
    if (!data.hasOwnProperty('links')) {
      reject(new Error("Data object does not contain property with name 'links'"));
    }
    if (!data.links.hasOwnProperty('first')) {
      reject(new Error("Data object does not contain property with name 'links.first'"));
    }
    if (!data.links.hasOwnProperty('previous')) {
      reject(new Error("Data object does not contain property with name 'links.previous'"));
    }
    if (!data.links.hasOwnProperty('next')) {
      reject(new Error("Data object does not contain property with name 'links.next'"));
    }
    if (!data.links.hasOwnProperty('last')) {
      reject(new Error("Data object does not contain property with name 'links.last'"));
    }
    if (!data.hasOwnProperty('nodes')) {
      reject(new Error("Data object does not contain property with name 'nodes'"));
    }
    if (!data.hasOwnProperty('relations')) {
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
