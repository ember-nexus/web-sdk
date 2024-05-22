import { UniqueUserIdentifier } from '../../Type/Definition';
import { Uuid } from '../../Type/Definition';
import { Data } from '../../Type/Definition/Data';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

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
