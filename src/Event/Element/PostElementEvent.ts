import type { v4 as uuidv4 } from 'uuid';

import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostElementEventDetails = {
  parentId: uuidv4;
  type: string;
  id: uuidv4 | null;
  data: Data;
  result: Promise<uuidv4> | null;
};

class PostElementEvent extends CustomEvent<PostElementEventDetails> {
  constructor(parentId: uuidv4, type: string, id: uuidv4 | null = null, data: Data = {}) {
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

  getParentId(): uuidv4 {
    return this.detail.parentId;
  }

  getType(): string {
    return this.detail.type;
  }

  getId(): uuidv4 | null {
    return this.detail.id;
  }

  getData(): Data {
    return this.detail.data;
  }

  getResult(): Promise<uuidv4> | null {
    return this.detail.result;
  }

  setResult(result: Promise<uuidv4> | null): PostElementEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostElementEvent, PostElementEventDetails };
