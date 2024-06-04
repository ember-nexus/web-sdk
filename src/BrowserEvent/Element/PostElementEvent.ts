import { NodeWithOptionalId, RelationWithOptionalId, Uuid } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type PostElementEventDetails = {
  parentId: Uuid;
  element: NodeWithOptionalId | RelationWithOptionalId;
  elementId: Promise<Uuid> | null;
};

class PostElementEvent extends CustomEvent<PostElementEventDetails> {
  public static type = EventIdentifier.PostElement;
  constructor(parentId: Uuid, element: NodeWithOptionalId | RelationWithOptionalId) {
    super(PostElementEvent.type, {
      ...customEventDefaultInit,
      detail: {
        parentId: parentId,
        element: element,
        elementId: null,
      },
    });
  }

  getParentId(): Uuid {
    return this.detail.parentId;
  }

  getElement(): NodeWithOptionalId | RelationWithOptionalId {
    return this.detail.element;
  }

  getElementId(): Promise<Uuid> | null {
    return this.detail.elementId;
  }

  setElementId(elementId: Promise<Uuid> | null): PostElementEvent {
    this.detail.elementId = elementId;
    return this;
  }
}

export { PostElementEvent, PostElementEventDetails };
