import { Container, Service } from 'typedi';

import {
  DeleteElementEvent,
  GetElementChildrenEvent,
  GetElementEvent,
  GetElementParentsEvent,
  GetElementRelatedEvent,
  GetIndexEvent,
  PatchElementEvent,
  PostElementEvent,
  PostIndexEvent,
  PutElementEvent,
} from './Element/index.js';
import {
  DeleteTokenEvent,
  GetMeEvent,
  GetTokenEvent,
  PostChangePasswordEvent,
  PostRegisterEvent,
  PostTokenEvent,
} from './User/index.js';
import { EmberNexus } from '../Service/index.js';

/**
 * Class which handles browser event subscriptions.
 */
@Service()
class BrowserEventHandler {
  private htmlElement: null | HTMLElement = null;

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
    if (this.htmlElement === null) {
      return this;
    }
    this.htmlElement.removeEventListener(GetElementEvent.type, this.handleGetElementEvent);
    this.htmlElement.removeEventListener(GetElementChildrenEvent.type, this.handleGetElementChildrenEvent);
    this.htmlElement.removeEventListener(GetElementParentsEvent.type, this.handleGetElementParentsEvent);
    this.htmlElement.removeEventListener(GetElementRelatedEvent.type, this.handleGetElementRelatedEvent);
    this.htmlElement.removeEventListener(GetIndexEvent.type, this.handleGetIndexEvent);
    this.htmlElement.removeEventListener(PostIndexEvent.type, this.handlePostIndexEvent);
    this.htmlElement.removeEventListener(PostElementEvent.type, this.handlePostElementEvent);
    this.htmlElement.removeEventListener(PutElementEvent.type, this.handlePutElementEvent);
    this.htmlElement.removeEventListener(PatchElementEvent.type, this.handlePatchElementEvent);
    this.htmlElement.removeEventListener(DeleteElementEvent.type, this.handleDeleteElementEvent);

    this.htmlElement.removeEventListener(PostRegisterEvent.type, this.handlePostRegisterEvent);
    this.htmlElement.removeEventListener(PostChangePasswordEvent.type, this.handlePostChangePasswordEvent);
    this.htmlElement.removeEventListener(GetMeEvent.type, this.handleGetMeEvent);
    this.htmlElement.removeEventListener(PostTokenEvent.type, this.handlePostTokenEvent);
    this.htmlElement.removeEventListener(GetTokenEvent.type, this.handleGetTokenEvent);
    this.htmlElement.removeEventListener(DeleteTokenEvent.type, this.handleDeleteTokenEvent);
    this.htmlElement = null;
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
  addBrowserEventListeners(node: HTMLElement): BrowserEventHandler {
    this.removeBrowserEventListeners();
    this.htmlElement = node;
    this.htmlElement.addEventListener(GetElementEvent.type, this.handleGetElementEvent);
    this.htmlElement.addEventListener(GetElementChildrenEvent.type, this.handleGetElementChildrenEvent);
    this.htmlElement.addEventListener(GetElementParentsEvent.type, this.handleGetElementParentsEvent);
    this.htmlElement.addEventListener(GetElementRelatedEvent.type, this.handleGetElementRelatedEvent);
    this.htmlElement.addEventListener(GetIndexEvent.type, this.handleGetIndexEvent);
    this.htmlElement.addEventListener(PostIndexEvent.type, this.handlePostIndexEvent);
    this.htmlElement.addEventListener(PostElementEvent.type, this.handlePostElementEvent);
    this.htmlElement.addEventListener(PutElementEvent.type, this.handlePutElementEvent);
    this.htmlElement.addEventListener(PatchElementEvent.type, this.handlePatchElementEvent);
    this.htmlElement.addEventListener(DeleteElementEvent.type, this.handleDeleteElementEvent);

    this.htmlElement.addEventListener(PostRegisterEvent.type, this.handlePostRegisterEvent);
    this.htmlElement.addEventListener(PostChangePasswordEvent.type, this.handlePostChangePasswordEvent);
    this.htmlElement.addEventListener(GetMeEvent.type, this.handleGetMeEvent);
    this.htmlElement.addEventListener(PostTokenEvent.type, this.handlePostTokenEvent);
    this.htmlElement.addEventListener(GetTokenEvent.type, this.handleGetTokenEvent);
    this.htmlElement.addEventListener(DeleteTokenEvent.type, this.handleDeleteTokenEvent);
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
    event.setIndexCollection(Container.get(EmberNexus).getIndex(event.getPage(), event.getPageSize()));
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
    event.setElementId(Container.get(EmberNexus).postIndex(event.getElement()));
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
    event.setElementId(Container.get(EmberNexus).postElement(event.getParentId(), event.getElement()));
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

  /**
   * Handles browser events of the type PostRegisterEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePostRegisterEvent(event: PostRegisterEvent): void {
    event.setUserId(
      Container.get(EmberNexus).postRegister(event.getUniqueUserIdentifier(), event.getPassword(), event.getData()),
    );
  }

  /**
   * Handles browser events of the type PostChangePasswordEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePostChangePasswordEvent(event: PostChangePasswordEvent): void {
    event.setResult(
      Container.get(EmberNexus).postChangePassword(
        event.getUniqueUserIdentifier(),
        event.getCurrentPassword(),
        event.getNewPassword(),
      ),
    );
  }

  /**
   * Handles browser events of the type GetMeEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetMeEvent(event: GetMeEvent): void {
    event.setMe(Container.get(EmberNexus).getMe());
  }

  /**
   * Handles browser events of the type PostTokenEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handlePostTokenEvent(event: PostTokenEvent): void {
    event.setToken(
      Container.get(EmberNexus).postToken(event.getUniqueUserIdentifier(), event.getPassword(), event.getData()),
    );
  }

  /**
   * Handles browser events of the type GetTokenEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleGetTokenEvent(event: GetTokenEvent): void {
    event.setToken(Container.get(EmberNexus).getToken());
  }

  /**
   * Handles browser events of the type DeleteTokenEvent.
   *
   * **⚠️ Warning**: This is an internal method. You should not use it directly.
   *
   * @param event
   * @private
   * @internal
   */
  private handleDeleteTokenEvent(event: DeleteTokenEvent): void {
    event.setResult(Container.get(EmberNexus).deleteToken());
  }
}

export { BrowserEventHandler };
