import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostElementEventDetails = {
  parentId: Uuid;
  type: string;
  id: Uuid | null;
  data: Data;
  result: Promise<Uuid> | null;
};

class PostElementEvent extends CustomEvent<PostElementEventDetails> {
  constructor(parentId: Uuid, type: string, id: Uuid | null = null, data: Data = {}) {
    super(EventIdentifier.PostElement, {
      ...customEventDefaultInit,
      detail: {
        parentId: parentId,
        type: type,
        id: id,
        data: data,
        result: null,
      },
    });
  }

  getParentId(): Uuid {
    return this.detail.parentId;
  }

  getType(): string {
    return this.detail.type;
  }

  getId(): Uuid | null {
    return this.detail.id;
  }

  getData(): Data {
    return this.detail.data;
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
