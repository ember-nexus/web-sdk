import { NodeWithOptionalId, RelationWithOptionalId, Uuid } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostIndexEventDetails = {
  element: NodeWithOptionalId | RelationWithOptionalId;
  result: Promise<Uuid> | null;
};

class PostIndexEvent extends CustomEvent<PostIndexEventDetails> {
  public static type = EventIdentifier.PostIndex;
  constructor(element: NodeWithOptionalId | RelationWithOptionalId) {
    super(PostIndexEvent.type, {
      ...customEventDefaultInit,
      detail: {
        element: element,
        result: null,
      },
    });
  }

  getElement(): NodeWithOptionalId | RelationWithOptionalId {
    return this.detail.element;
  }

  getResult(): Promise<Uuid> | null {
    return this.detail.result;
  }

  setResult(result: Promise<Uuid> | null): PostIndexEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostIndexEvent, PostIndexEventDetails };
