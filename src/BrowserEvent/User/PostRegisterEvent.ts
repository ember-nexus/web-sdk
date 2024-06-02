import { Data, UniqueUserIdentifier, Uuid } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostRegisterEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  password: string;
  data: Data;
  userId: Promise<Uuid> | null;
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
        userId: null,
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

  getUserId(): Promise<Uuid> | null {
    return this.detail.userId;
  }

  setUserId(userId: Promise<Uuid> | null): PostRegisterEvent {
    this.detail.userId = userId;
    return this;
  }
}

export { PostRegisterEvent, PostRegisterEventDetails };
