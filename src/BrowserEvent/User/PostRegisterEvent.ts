import { Data } from '~/Type/Definition/Data';
import { UniqueUserIdentifier } from '~/Type/Definition/UniqueUserIdentifier';
import { Uuid } from '~/Type/Definition/Uuid';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostRegisterEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  password: string;
  data: Data;
  result: Promise<Uuid> | null;
};

class PostRegisterEvent extends CustomEvent<PostRegisterEventDetails> {
  public static type = EventIdentifier.PostRegister;
  constructor(uniqueUserIdentifier: UniqueUserIdentifier, password: string, data: Data = {}) {
    super(PostRegisterEvent.type, {
      ...customEventDefaultInit,
      detail: {
        uniqueUserIdentifier: uniqueUserIdentifier,
        password: password,
        data: data,
        result: null,
      },
    });
  }

  getUniqueUserIdentifier(): UniqueUserIdentifier {
    return this.detail.uniqueUserIdentifier;
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
