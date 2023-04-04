import { v4 as uuidv4 } from 'uuid';

import { deleteElement } from './endpoint/delete-element.js';
import { getElement } from './endpoint/get-element.js';
import { patchElement } from './endpoint/patch-element.js';
import { putElement } from './endpoint/put-element.js';
import { logger } from './logger.js';
import { Cache } from './type/cache.js';
import { Node } from './type/node.js';
import { Relation } from './type/relation.js';

export class EmberNexus {
  private _elementCache: Cache<Node | Relation>;

  constructor() {
    this._elementCache = new Cache<Node | Relation>();
  }

  async getElement(uuid: typeof uuidv4, cacheOnly = false): Promise<Node | Relation> {
    return new Promise((resolve, reject) => {
      if (this._elementCache.has(uuid)) {
        logger.debug(`Returned element with identifier ${uuid.toString()} from cache.`);
        resolve(this._elementCache.get(uuid));
        return;
      }
      if (cacheOnly) {
        reject(new Error(`Unable to find element with identifier ${uuid.toString()} in cache.`));
        return;
      }
      getElement(uuid)
        .then((element) => {
          this._elementCache.set(uuid, element);
          resolve(element);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async putElement(
    uuid: typeof uuidv4,
    data: Record<string, unknown>,
    loadNewData = false,
  ): Promise<void | Node | Relation> {
    return new Promise((resolve, reject) => {
      putElement(uuid, data)
        .then(async () => {
          this._elementCache.remove(uuid);
          logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was updated.`);
          if (loadNewData) {
            await this.getElement(uuid)
              .then((element) => {
                resolve(element);
                return;
              })
              .catch((error) => {
                reject(error);
                return;
              });
          }
          resolve();
          return;
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async patchElement(
    uuid: typeof uuidv4,
    data: Record<string, unknown>,
    loadNewData = false,
  ): Promise<void | Node | Relation> {
    return new Promise((resolve, reject) => {
      patchElement(uuid, data)
        .then(async () => {
          this._elementCache.remove(uuid);
          logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was patched.`);
          if (loadNewData) {
            await this.getElement(uuid)
              .then((element) => {
                resolve(element);
                return;
              })
              .catch((error) => {
                reject(error);
                return;
              });
          }
          resolve();
          return;
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async deleteElement(uuid: typeof uuidv4): Promise<void | Node | Relation> {
    return new Promise((resolve, reject) => {
      deleteElement(uuid)
        .then(() => {
          this._elementCache.remove(uuid);
          logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was deleted.`);
          resolve();
          return;
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
