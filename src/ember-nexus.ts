import { v4 as uuidv4 } from 'uuid';
import {Node} from "./type/node.js";
import {Relation} from "./type/relation.js";
import {Cache} from "./type/cache.js";
import {getElement} from "./endpoint/get-element.js";


export class EmberNexus {

  private _cache: Cache<Node|Relation>;

  constructor() {
    this._cache = new Cache<Node | Relation>();
  }

  async getElement(uuid: typeof uuidv4, cacheOnly = false): Promise<Node|Relation>
  {
    const self = this;
    return new Promise(function (resolve, reject) {
      if (self._cache.has(uuid)) {
        resolve(self._cache.get(uuid));
      }
      if (cacheOnly) {
        reject();
      }
      getElement(uuid)
        .then(
          (element) => {
            self._cache.set(uuid, element);
            resolve(element);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

}
