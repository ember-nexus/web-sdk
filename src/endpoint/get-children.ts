import { Options } from '../options.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PartialCollection } from '../type/partial-collection.js';
import { Node } from '../type/node.js';
import { Relation } from '../type/relation.js';

export async function getChildren(
  uuid: typeof uuidv4,
  page: number = 1,
  pageSize: null | number = null,
): Promise<PartialCollection> {
  const options = Options.getInstance();
  if (pageSize === null) {
    pageSize = options.pageSize;
  }
  return new Promise(function (resolve, reject) {
    axios
      .get(
        `${
          options.apiHost
        }${uuid.toString()}/children?page=${page}&pageSize=${pageSize}`,
      )
      .then(function (response) {
        console.log(response);
        // const partialCollection: PartialCollection = {
        //   type: '_PartialCollection',
        //   id: response.data['@id'],
        //   totalNodes: response.data.totalNodes,
        //   links: {
        //     first: string,
        //     previous: string|null,
        //     next: string|null,
        //     last: string,
        //   },
        //   nodes: Node[],
        //   relations: Relation[],
        // };
        // resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
