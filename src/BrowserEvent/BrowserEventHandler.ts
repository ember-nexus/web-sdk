import { Container, Service } from 'typedi';

import { DeleteElementEvent } from '~/BrowserEvent/Element/DeleteElementEvent';
import { GetElementChildrenEvent } from '~/BrowserEvent/Element/GetElementChildrenEvent';
import { GetElementEvent } from '~/BrowserEvent/Element/GetElementEvent';
import { GetElementParentsEvent } from '~/BrowserEvent/Element/GetElementParentsEvent';
import { GetElementRelatedEvent } from '~/BrowserEvent/Element/GetElementRelatedEvent';
import { GetIndexEvent } from '~/BrowserEvent/Element/GetIndexEvent';
import { PatchElementEvent } from '~/BrowserEvent/Element/PatchElementEvent';
import { PostElementEvent } from '~/BrowserEvent/Element/PostElementEvent';
import { PostIndexEvent } from '~/BrowserEvent/Element/PostIndexEvent';
import { PutElementEvent } from '~/BrowserEvent/Element/PutElementEvent';
import { EmberNexus } from '~/EmberNexus';

/**
 * Class which handles browser event subscriptions.
 */
@Service()
class BrowserEventHandler {
  private browserNode: null | Node = null;

  constructor() {}

  /**
   * Destructor of the class. Call this method before you delete instances of this class to avoid dangling event
   * subscriptions.
   */
  destructor(): BrowserEventHandler {
    this.removeBrowserEventListeners();
    return this;
  }

  /**
   * Removes all event subscriptions.
   */
  removeBrowserEventListeners(): BrowserEventHandler {
    if (this.browserNode === null) {
      return this;
    }
    this.browserNode.removeEventListener(GetElementEvent.type, this.handleGetElementEvent);
    this.browserNode.removeEventListener(GetElementChildrenEvent.type, this.handleGetElementChildrenEvent);
    this.browserNode.removeEventListener(GetElementParentsEvent.type, this.handleGetElementParentsEvent);
    this.browserNode.removeEventListener(GetElementRelatedEvent.type, this.handleGetElementRelatedEvent);
    this.browserNode.removeEventListener(GetIndexEvent.type, this.handleGetIndexEvent);
    this.browserNode.removeEventListener(PostIndexEvent.type, this.handlePostIndexEvent);
    this.browserNode.removeEventListener(PostElementEvent.type, this.handlePostElementEvent);
    this.browserNode.removeEventListener(PutElementEvent.type, this.handlePutElementEvent);
    this.browserNode.removeEventListener(PatchElementEvent.type, this.handlePatchElementEvent);
    this.browserNode.removeEventListener(DeleteElementEvent.type, this.handleDeleteElementEvent);
    this.browserNode = null;
    return this;
  }

  /**
   * Adds new event subscriptions to the given DOM node.
   *
   * Only one DOM node can hold event subscriptions at the same time, therefore this method will remove old
   * subscriptions from other nodes automatically.
   *
   * @param node The DOM node which should receive the event listeners.
   */
  addBrowserEventListeners(node: Node): BrowserEventHandler {
    this.removeBrowserEventListeners();
    this.browserNode = node;
    this.browserNode.addEventListener(GetElementEvent.type, this.handleGetElementEvent);
    this.browserNode.addEventListener(GetElementChildrenEvent.type, this.handleGetElementChildrenEvent);
    this.browserNode.addEventListener(GetElementParentsEvent.type, this.handleGetElementParentsEvent);
    this.browserNode.addEventListener(GetElementRelatedEvent.type, this.handleGetElementRelatedEvent);
    this.browserNode.addEventListener(GetIndexEvent.type, this.handleGetIndexEvent);
    this.browserNode.addEventListener(PostIndexEvent.type, this.handlePostIndexEvent);
    this.browserNode.addEventListener(PostElementEvent.type, this.handlePostElementEvent);
    this.browserNode.addEventListener(PutElementEvent.type, this.handlePutElementEvent);
    this.browserNode.addEventListener(PatchElementEvent.type, this.handlePatchElementEvent);
    this.browserNode.addEventListener(DeleteElementEvent.type, this.handleDeleteElementEvent);
    return this;
  }

  /**
   * Handles browser events of the type GetElementEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetElementEvent(event: GetElementEvent): void {
    event.setElement(Container.get(EmberNexus).getElement(event.getElementId()));
  }

  /**
   * Handles browser events of the type GetElementChildrenEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetElementChildrenEvent(event: GetElementChildrenEvent): void {
    event.setChildren(
      Container.get(EmberNexus).getElementChildren(event.getParentId(), event.getPage(), event.getPageSize()),
    );
  }

  /**
   * Handles browser events of the type GetElementParentsEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetElementParentsEvent(event: GetElementParentsEvent): void {
    event.setParents(
      Container.get(EmberNexus).getElementParents(event.getChildId(), event.getPage(), event.getPageSize()),
    );
  }

  /**
   * Handles browser events of the type GetElementRelatedEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetElementRelatedEvent(event: GetElementRelatedEvent): void {
    event.setRelated(
      Container.get(EmberNexus).getElementRelated(event.getCenterId(), event.getPage(), event.getPageSize()),
    );
  }

  /**
   * Handles browser events of the type GetIndexEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetIndexEvent(event: GetIndexEvent): void {
    event.setIndexElements(Container.get(EmberNexus).getIndex(event.getPage(), event.getPageSize()));
  }

  /**
   * Handles browser events of the type PostIndexEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePostIndexEvent(event: PostIndexEvent): void {
    event.setResult(Container.get(EmberNexus).postIndex(event.getElement()));
  }

  /**
   * Handles browser events of the type PostElementEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePostElementEvent(event: PostElementEvent): void {
    event.setResult(Container.get(EmberNexus).postElement(event.getParentId(), event.getElement()));
  }

  /**
   * Handles browser events of the type PutElementEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePutElementEvent(event: PutElementEvent): void {
    event.setResult(Container.get(EmberNexus).putElement(event.getElementId(), event.getData()));
  }

  /**
   * Handles browser events of the type PatchElementEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePatchElementEvent(event: PatchElementEvent): void {
    event.setResult(Container.get(EmberNexus).patchElement(event.getElementId(), event.getData()));
  }

  /**
   * Handles browser events of the type DeleteElementEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleDeleteElementEvent(event: DeleteElementEvent): void {
    event.setResult(Container.get(EmberNexus).deleteElement(event.getElementId()));
  }
}

export { BrowserEventHandler };
