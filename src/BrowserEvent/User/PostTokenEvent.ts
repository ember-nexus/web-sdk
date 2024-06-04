import { Data, Token, UniqueUserIdentifier } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type PostTokenEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  password: string;
  data: Data;
  token: Promise<Token> | null;
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
        token: null,
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

  getToken(): Promise<Token> | null {
    return this.detail.token;
  }

  setToken(token: Promise<Token> | null): PostTokenEvent {
    this.detail.token = token;
    return this;
  }
}

export { PostTokenEvent, PostTokenEventDetails };
