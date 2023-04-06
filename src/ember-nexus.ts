import { v4 as uuidv4 } from 'uuid';

import deleteElement from './endpoint/delete-element.js';
import getElement from './endpoint/get-element.js';
import patchElement from './endpoint/patch-element.js';
import putElement from './endpoint/put-element.js';
import DeleteElementEvent from './event/delete-element-event.js';
import GetElementEvent from './event/get-element-event.js';
import Event from './event/index.js';
import PatchElementEvent from './event/patch-element-event.js';
import PutElementEvent from './event/put-element-event.js';
import logger from './logger.js';
import Cache from './type/cache.js';
import Node from './type/node.js';
import Relation from './type/relation.js';

class EmberNexus {
  private _elementCache: Cache<Node | Relation> = new Cache<Node | Relation>();
  private _domElement: HTMLElement | null = null;

  bindToDomElement(domElement: HTMLElement): void {
    if (this._domElement) {
      // remove event listeners etc. from the element first
      this._domElement.removeEventListener(Event.GetElementEvent, this.handleGetElementEvent.bind(this));
      this._domElement.removeEventListener(Event.PutElementEvent, this.handlePutElementEvent.bind(this));
      this._domElement.removeEventListener(Event.PatchElementEvent, this.handlePatchElementEvent.bind(this));
      this._domElement.removeEventListener(Event.DeleteElementEvent, this.handleDeleteElementEvent.bind(this));
    }
    this._domElement = domElement;
    this._domElement.addEventListener(Event.GetElementEvent, this.handleGetElementEvent.bind(this));
    this._domElement.addEventListener(Event.PutElementEvent, this.handlePutElementEvent.bind(this));
    this._domElement.addEventListener(Event.PatchElementEvent, this.handlePatchElementEvent.bind(this));
    this._domElement.addEventListener(Event.DeleteElementEvent, this.handleDeleteElementEvent.bind(this));
  }

  handleGetElementEvent(event: GetElementEvent): void {
    event.setElement(this.getElement(event.getUuid(), event.getCacheOnly()));
    event.preventDefault();
    event.stopPropagation();
  }

  handlePutElementEvent(event: PutElementEvent): void {
    event.setElement(this.putElement(event.getUuid(), event.getData(), event.getLoadNewData()));
    event.preventDefault();
    event.stopPropagation();
  }

  handlePatchElementEvent(event: PatchElementEvent): void {
    event.setElement(this.patchElement(event.getUuid(), event.getData(), event.getLoadNewData()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleDeleteElementEvent(event: DeleteElementEvent): void {
    event.setElement(this.deleteElement(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
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

  async deleteElement(uuid: typeof uuidv4): Promise<void> {
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

export default EmberNexus;
