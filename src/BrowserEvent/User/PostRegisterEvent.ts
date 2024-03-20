import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostRegisterEventDetails = {
  password: string;
  data: Data;
  result: Promise<Uuid> | null;
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

  getResult(): Promise<Uuid> | null {
    return this.detail.result;
  }

  setResult(result: Promise<Uuid> | null): PostRegisterEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostRegisterEvent, PostRegisterEventDetails };
