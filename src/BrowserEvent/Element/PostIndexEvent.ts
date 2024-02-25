import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostIndexEventDetails = {
  type: string;
  id: Uuid | null;
  start: Uuid | null;
  end: Uuid | null;
  data: Data;
  result: Promise<Uuid> | null;
};

class PostIndexEvent extends CustomEvent<PostIndexEventDetails> {
  constructor(
    type: string,
    id: Uuid | null = null,
    start: Uuid | null = null,
    end: Uuid | null = null,
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

  getId(): Uuid | null {
    return this.detail.id;
  }

  getStart(): Uuid | null {
    return this.detail.start;
  }

  getEnd(): Uuid | null {
    return this.detail.end;
  }

  getData(): Data {
    return this.detail.data;
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
