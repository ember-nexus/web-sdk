import { NodeWithOptionalId, RelationWithOptionalId, Uuid } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostElementEventDetails = {
  parentId: Uuid;
  element: NodeWithOptionalId | RelationWithOptionalId;
  result: Promise<Uuid> | null;
};

class PostElementEvent extends CustomEvent<PostElementEventDetails> {
  public static type = EventIdentifier.PostElement;
  constructor(parentId: Uuid, element: NodeWithOptionalId | RelationWithOptionalId) {
    super(PostElementEvent.type, {
      ...customEventDefaultInit,
      detail: {
        parentId: parentId,
        element: element,
        result: null,
      },
    });
  }

  getParentId(): Uuid {
    return this.detail.parentId;
  }

  getElement(): NodeWithOptionalId | RelationWithOptionalId {
    return this.detail.element;
  }

  getResult(): Promise<Uuid> | null {
    return this.detail.result;
  }

  setResult(result: Promise<Uuid> | null): PostElementEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostElementEvent, PostElementEventDetails };
