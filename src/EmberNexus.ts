import { v4 as uuidv4 } from 'uuid';

import DefaultLogger from './DefaultLogger.js';
import DeleteElementEndpoint from './Endpoint/DeleteElementEndpoint.js';
import GetElementEndpoint from './Endpoint/GetElementEndpoint.js';
import PatchElementEndpoint from './Endpoint/PatchElementEndpoint.js';
import PutElementEndpoint from './Endpoint/PutElementEndpoint.js';
import DeleteElementEvent from './Event/DeleteElementEvent.js';
import GetElementEvent from './Event/GetElementEvent.js';
import Event from './Event/index.js';
import PatchElementEvent from './Event/PatchElementEvent.js';
import PutElementEvent from './Event/PutElementEvent.js';
import Options from './Options.js';
import Cache from './Type/Cache.js';
import LoggerInterface from './Type/LoggerInterface.js';
import Node from './Type/Node.js';
import OptionsInterface from './Type/OptionsInterface.js';
import Relation from './Type/Relation.js';

class EmberNexus {
  private _elementCache: Cache<Node | Relation> = new Cache<Node | Relation>();
  private _domElement: HTMLElement | null = null;

  constructor(
    private logger: LoggerInterface,
    private options: OptionsInterface,
    private getElementEndpoint: GetElementEndpoint,
    private patchElementEndpoint: PatchElementEndpoint,
    private putElementEndpoint: PutElementEndpoint,
    private deleteElementEndpoint: DeleteElementEndpoint,
  ) {}

  static create(logger: LoggerInterface | null = null, options: OptionsInterface | null = null): EmberNexus {
    if (logger === null) {
      logger = new DefaultLogger();
    }
    if (options === null) {
      options = new Options();
    }
    return new EmberNexus(
      logger,
      options,
      new GetElementEndpoint(logger, options),
      new PatchElementEndpoint(logger, options),
      new PutElementEndpoint(logger, options),
      new DeleteElementEndpoint(logger, options),
    );
  }

  debug(): { options: OptionsInterface; elementCache: Cache<Node | Relation> } {
    const debugData = {
      options: this.options,
      elementCache: this._elementCache,
    };
    this.logger.debug(debugData);
    return debugData;
  }

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

  getOptions(): OptionsInterface {
    return this.options;
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
        this.logger.debug(`Returned element with identifier ${uuid.toString()} from cache.`);
        resolve(this._elementCache.get(uuid));
        return;
      }
      if (cacheOnly) {
        reject(new Error(`Unable to find element with identifier ${uuid.toString()} in cache.`));
        return;
      }
      this.getElementEndpoint
        .getElement(uuid)
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
      this.putElementEndpoint
        .putElement(uuid, data)
        .then(async () => {
          this._elementCache.remove(uuid);
          this.logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was updated.`);
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
      this.patchElementEndpoint
        .patchElement(uuid, data)
        .then(async () => {
          this._elementCache.remove(uuid);
          this.logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was patched.`);
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
      this.deleteElementEndpoint
        .deleteElement(uuid)
        .then(() => {
          this._elementCache.remove(uuid);
          this.logger.debug(`Removed element with identifier ${uuid.toString()} from cache as it was deleted.`);
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
