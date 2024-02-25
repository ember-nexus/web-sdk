import DefaultLogger from './DefaultLogger.js';
import EmberNexusCache from './EmberNexusCache.js';
import DeleteElementEvent from './BrowserEvent/DeleteElementEvent.js';
import GetChildrenEvent from './BrowserEvent/GetChildrenEvent.js';
import GetElementEvent from './BrowserEvent/GetElementEvent.js';
import GetParentsEvent from './BrowserEvent/GetParentsEvent.js';
import GetRelatedEvent from './BrowserEvent/GetRelatedEvent.js';
import Event from './BrowserEvent/index.js';
import PatchElementEvent from './BrowserEvent/PatchElementEvent.js';
import PutElementEvent from './BrowserEvent/PutElementEvent.js';
import SearchEvent from './BrowserEvent/SearchEvent.js';
import Options from './Options.js';
import LoggerInterface from './Type/LoggerInterface.js';
import OptionsInterface from './Type/OptionsInterface.js';

class EmberNexus {
  private _domElement: HTMLElement | null = null;

  constructor(private _cache: EmberNexusCache) {}

  static create(logger: LoggerInterface | null = null, options: OptionsInterface | null = null): EmberNexus {
    if (logger === null) {
      logger = new DefaultLogger();
    }
    if (options === null) {
      options = new Options();
    }
    const cache = EmberNexusCache.create(logger, options);
    return new EmberNexus(cache);
  }

  bindToDomElement(domElement: HTMLElement): void {
    if (this._domElement) {
      // remove event listeners etc. from the element first
      this._domElement.removeEventListener(Event.GetElementEvent, this.handleGetElementEvent.bind(this));
      this._domElement.removeEventListener(Event.GetChildrenEvent, this.handleGetChildrenEvent.bind(this));
      this._domElement.removeEventListener(Event.GetParentsEvent, this.handleGetParentsEvent.bind(this));
      this._domElement.removeEventListener(Event.GetRelatedEvent, this.handleGetRelatedEvent.bind(this));
      this._domElement.removeEventListener(Event.PutElementEvent, this.handlePutElementEvent.bind(this));
      this._domElement.removeEventListener(Event.PatchElementEvent, this.handlePatchElementEvent.bind(this));
      this._domElement.removeEventListener(Event.DeleteElementEvent, this.handleDeleteElementEvent.bind(this));
      this._domElement.removeEventListener(Event.SearchEvent, this.handleSearchEvent.bind(this));
    }
    this._domElement = domElement;
    this._domElement.addEventListener(Event.GetElementEvent, this.handleGetElementEvent.bind(this));
    this._domElement.addEventListener(Event.GetChildrenEvent, this.handleGetChildrenEvent.bind(this));
    this._domElement.addEventListener(Event.GetParentsEvent, this.handleGetParentsEvent.bind(this));
    this._domElement.addEventListener(Event.GetRelatedEvent, this.handleGetRelatedEvent.bind(this));
    this._domElement.addEventListener(Event.PutElementEvent, this.handlePutElementEvent.bind(this));
    this._domElement.addEventListener(Event.PatchElementEvent, this.handlePatchElementEvent.bind(this));
    this._domElement.addEventListener(Event.DeleteElementEvent, this.handleDeleteElementEvent.bind(this));
    this._domElement.addEventListener(Event.SearchEvent, this.handleSearchEvent.bind(this));
  }

  handleGetElementEvent(event: GetElementEvent): void {
    event.setElement(this._cache.getElement(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleGetChildrenEvent(event: GetChildrenEvent): void {
    event.setElements(this._cache.getChildren(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleGetParentsEvent(event: GetParentsEvent): void {
    event.setElements(this._cache.getParents(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleGetRelatedEvent(event: GetRelatedEvent): void {
    event.setElements(this._cache.getRelated(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
  }

  handlePutElementEvent(event: PutElementEvent): void {
    // event.setElement(this.putElement(event.getUuid(), event.getData(), event.getLoadNewData()));
    event.preventDefault();
    event.stopPropagation();
  }

  handlePatchElementEvent(event: PatchElementEvent): void {
    // event.setElement(this.patchElement(event.getUuid(), event.getData(), event.getLoadNewData()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleDeleteElementEvent(event: DeleteElementEvent): void {
    // event.setElement(this.deleteElement(event.getUuid()));
    event.preventDefault();
    event.stopPropagation();
  }

  handleSearchEvent(event: SearchEvent): void {
    event.setElements(this._cache.fetchSearchPage(event.getPayload(), event.getPage()));
    event.preventDefault();
    event.stopPropagation();
  }
}

export default EmberNexus;
