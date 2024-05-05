import { Data } from '~/Type/Definition/Data';
import { UniqueUserIdentifier } from '~/Type/Definition/UniqueUserIdentifier';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostChangePasswordEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  currentPassword: string;
  newPassword: string;
  data: Data;
  result: Promise<void> | null;
};

class PostChangePasswordEvent extends CustomEvent<PostChangePasswordEventDetails> {
  public static type = EventIdentifier.PostChangePassword;
  constructor(
    uniqueUserIdentifier: UniqueUserIdentifier,
    currentPassword: string,
    newPassword: string,
    data: Data = {},
  ) {
    super(PostChangePasswordEvent.type, {
      ...customEventDefaultInit,
      detail: {
        uniqueUserIdentifier: uniqueUserIdentifier,
        currentPassword: currentPassword,
        newPassword: newPassword,
        data: data,
        result: null,
      },
    });
  }

  getUniqueUserIdentifier(): UniqueUserIdentifier {
    return this.detail.uniqueUserIdentifier;
  }

  getCurrentPassword(): string {
    return this.detail.currentPassword;
  }

  getNewPassword(): string {
    return this.detail.newPassword;
  }

  getData(): Data {
    return this.detail.data;
  }

  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  setResult(result: Promise<void> | null): PostChangePasswordEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostChangePasswordEvent, PostChangePasswordEventDetails };
