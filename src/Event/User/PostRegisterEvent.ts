import type { v4 as uuidv4 } from 'uuid';

import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostRegisterEventDetails = {
  password: string;
  data: Data;
  result: Promise<uuidv4> | null;
};

class PostRegisterEvent extends CustomEvent<PostRegisterEventDetails> {
  constructor(password: string, data: Data = {}) {
    super(EventIdentifier.PostRegister, {
      ...customEventDefaultInit,
      detail: {
        password: password,
        data: data,
        result: null,
      },
    });
  }

  getPassword(): string {
    return this.detail.password;
  }

  getData(): Data {
    return this.detail.data;
  }

  getResult(): Promise<uuidv4> | null {
    return this.detail.result;
  }

  setResult(result: Promise<uuidv4> | null): PostRegisterEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostRegisterEvent, PostRegisterEventDetails };
