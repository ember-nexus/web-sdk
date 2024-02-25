import type { v4 as uuidv4 } from 'uuid';

import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostIndexEventDetails = {
  type: string;
  id: uuidv4 | null;
  start: uuidv4 | null;
  end: uuidv4 | null;
  data: Data;
  result: Promise<uuidv4> | null;
};

class PostIndexEvent extends CustomEvent<PostIndexEventDetails> {
  constructor(
    type: string,
    id: uuidv4 | null = null,
    start: uuidv4 | null = null,
    end: uuidv4 | null = null,
    data: Data = {},
  ) {
    super(EventIdentifier.PostIndex, {
      ...customEventDefaultInit,
      detail: {
        type: type,
        id: id,
        start: start,
        end: end,
        data: data,
        result: null,
      },
    });
  }

  getType(): string {
    return this.detail.type;
  }

  getId(): uuidv4 | null {
    return this.detail.id;
  }

  getStart(): uuidv4 | null {
    return this.detail.start;
  }

  getEnd(): uuidv4 | null {
    return this.detail.end;
  }

  getData(): Data {
    return this.detail.data;
  }

  getResult(): Promise<uuidv4> | null {
    return this.detail.result;
  }

  setResult(result: Promise<uuidv4> | null): PostIndexEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostIndexEvent, PostIndexEventDetails };
