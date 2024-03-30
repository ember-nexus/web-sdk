import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type DeleteElementEventDetails = {
  elementUuid: Uuid;
  result: Promise<void> | null;
};

/**
 * The DeleteElementEvent corresponds to the DeleteElementEndpoint.
 *
 * Browser event can be emitted by code that does not have direct access to the Ember Nexus Web SDK instance.
 *
 * @see [Web SDK: Delete element event](https://ember-nexus.github.io/web-sdk/#/browser-events/element/delete-element)
 */
class DeleteElementEvent extends CustomEvent<DeleteElementEventDetails> {
  /**
   * Creates a new DeleteElementEvent.
   *
   * @param elementUuid The Uuid of the element which should be deleted.
   */
  constructor(elementUuid: Uuid) {
    super(EventIdentifier.DeleteElement, {
      ...customEventDefaultInit,
      detail: {
        elementUuid: elementUuid,
        result: null,
      },
    });
  }

  /**
   * Returns the Uuid of the element which should be deleted.
   */
  getElementUuid(): Uuid {
    return this.detail.elementUuid;
  }

  /**
   * Returns null by default or a promise if the event is handled.
   */
  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  /**
   * Used to set the result of the event.
   *
   * @param result
   */
  setResult(result: Promise<void>): void {
    this.detail.result = result;
  }
}

export { DeleteElementEvent, DeleteElementEventDetails };
