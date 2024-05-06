import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { RelationWithOptionalId } from '~/Type/Definition/RelationWithOptionalId';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

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
