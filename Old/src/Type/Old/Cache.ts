import { v4 as uuidv4 } from 'uuid';

import TimeToLifeReference from './TimeToLifeReference.js';

interface ICache<T> {
  set(uuid: typeof uuidv4, data: T): void;
  get(uuid: typeof uuidv4): T | null;
  has(uuid: typeof uuidv4): boolean;
  remove(uuid: typeof uuidv4): void;
  clear(): void;
  clearOldElements(): void;
}

type UuidMappedObject<T> = {
  [key: string]: T;
};

class Cache<T> implements ICache<T> {
  private _maxAgeInSeconds: number;
  private _cache: UuidMappedObject<T>;
  private _timeToLifeStack: TimeToLifeReference[];

  constructor(maxAgeInSeconds = 1200) {
    this._maxAgeInSeconds = maxAgeInSeconds;
    this._cache = {};
    this._timeToLifeStack = [];
  }

  set(uuid: typeof uuidv4, data: T): void {
    if (this.has(uuid)) {
      this.remove(uuid);
    }
    this._cache[uuid] = data;
    this._timeToLifeStack.push({
      uuid: uuid,
      timestamp: Math.floor(Date.now() / 1000),
    });
  }

  get(uuid: typeof uuidv4): T | null {
    if (this.has(uuid)) {
      return this._cache[uuid];
    }
    return null;
  }

  has(uuid: typeof uuidv4): boolean {
    return Object.prototype.hasOwnProperty.call(this._cache, uuid);
  }

  remove(uuid: typeof uuidv4): void {
    delete this._cache[uuid];
    const index = this._timeToLifeStack.findIndex((e) => e.uuid === uuid);
    if (index >= 0) {
      this._timeToLifeStack.splice(index, 1);
    }
  }

  clear(): void {
    this._cache = {};
    this._timeToLifeStack = [];
  }

  clearOldElements(): void {
    const timestamp = Math.floor(Date.now() / 1000) - this._maxAgeInSeconds;
    let finished = false;
    while (!finished) {
      if (this._timeToLifeStack.length === 0) {
        finished = true;
        continue;
      }
      if (this._timeToLifeStack[0].timestamp > timestamp) {
        finished = true;
        continue;
      }
      delete this._cache[this._timeToLifeStack[0].uuid];
      this._timeToLifeStack.shift();
    }
  }
}

export default Cache;
