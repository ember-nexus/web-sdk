import { Data } from '~/Type/Definition/Data';
import { Token } from '~/Type/Definition/Token';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostTokenEventDetails = {
  user: string;
  password: string;
  data: Data;
  result: Promise<Token> | null;
};

class PostTokenEvent extends CustomEvent<PostTokenEventDetails> {
  constructor(user: string, password: string, data: Data = {}) {
    super(EventIdentifier.PostToken, {
      ...customEventDefaultInit,
      detail: {
        user: user,
        password: password,
        data: data,
        result: null,
      },
    });
  }

  getUser(): string {
    return this.detail.user;
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
