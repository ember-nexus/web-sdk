import { Data, Token, UniqueUserIdentifier } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostTokenEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  password: string;
  data: Data;
  result: Promise<Token> | null;
};

class PostTokenEvent extends CustomEvent<PostTokenEventDetails> {
  public static type = EventIdentifier.PostToken;
  constructor(uniqueUserIdentifier: UniqueUserIdentifier, password: string, data: Data = {}) {
    super(PostTokenEvent.type, {
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

  getResult(): Promise<Token> | null {
    return this.detail.result;
  }

  setResult(result: Promise<Token> | null): PostTokenEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostTokenEvent, PostTokenEventDetails };
