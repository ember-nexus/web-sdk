import type { Node } from '~/Type/Definition/Node';
import type { Relation } from '~/Type/Definition/Relation';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetElementEventDetails = {
  elementId: Uuid;
  element: Promise<Node | Relation> | null;
};

/**
 * The GetElementEvent corresponds to the GetElementEndpoint.
 *
 * Browser event can be emitted by code that does not have direct access to the Ember Nexus Web SDK instance.
 *
 * @see [Web SDK: Get element event](https://ember-nexus.github.io/web-sdk/#/browser-events/element/get-element)
 */
class GetElementEvent extends CustomEvent<GetElementEventDetails> {
  public static type = EventIdentifier.GetElement;

  /**
   *
   * Creates a new GetElementEvent.
   *
   * @param elementId The Uuid of the element which should be returned.
   */
  constructor(elementId: Uuid) {
    super(GetElementEvent.type, {
      ...customEventDefaultInit,
      detail: {
        elementId: elementId,
        element: null,
      },
    });
  }

  /**
   * Returns the Uuid of the element which should be returned.
   */
  getElementId(): Uuid {
    return this.detail.elementId;
  }

  /**
   * Returns null by default or a promise if the event is handled.
   */
  getElement(): Promise<Node | Relation> | null {
    return this.detail.element;
  }

  /**
   * Used to set the result of the event.
   *
   * @param element
   */
  setElement(element: Promise<Node | Relation>): void {
    this.detail.element = element;
  }
}

export { GetElementEvent, GetElementEventDetails };
