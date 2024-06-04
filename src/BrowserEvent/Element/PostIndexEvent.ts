import { NodeWithOptionalId, RelationWithOptionalId, Uuid } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type PostIndexEventDetails = {
  element: NodeWithOptionalId | RelationWithOptionalId;
  elementId: Promise<Uuid> | null;
};

class PostIndexEvent extends CustomEvent<PostIndexEventDetails> {
  public static type = EventIdentifier.PostIndex;
  constructor(element: NodeWithOptionalId | RelationWithOptionalId) {
    super(PostIndexEvent.type, {
      ...customEventDefaultInit,
      detail: {
        element: element,
        elementId: null,
      },
    });
  }

  getElement(): NodeWithOptionalId | RelationWithOptionalId {
    return this.detail.element;
  }

  getElementId(): Promise<Uuid> | null {
    return this.detail.elementId;
  }

  setElementId(elementId: Promise<Uuid> | null): PostIndexEvent {
    this.detail.elementId = elementId;
    return this;
  }
}

export { PostIndexEvent, PostIndexEventDetails };
