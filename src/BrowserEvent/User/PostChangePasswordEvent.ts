import { UniqueUserIdentifier } from '../../Type/Definition';
import { EventIdentifier } from '../../Type/Enum';
import { customEventDefaultInit } from '../../Type/Partial';

type PostChangePasswordEventDetails = {
  uniqueUserIdentifier: UniqueUserIdentifier;
  currentPassword: string;
  newPassword: string;
  result: Promise<void> | null;
};

class PostChangePasswordEvent extends CustomEvent<PostChangePasswordEventDetails> {
  public static type = EventIdentifier.PostChangePassword;
  constructor(uniqueUserIdentifier: UniqueUserIdentifier, currentPassword: string, newPassword: string) {
    super(PostChangePasswordEvent.type, {
      ...customEventDefaultInit,
      detail: {
        uniqueUserIdentifier: uniqueUserIdentifier,
        currentPassword: currentPassword,
        newPassword: newPassword,
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

  getResult(): Promise<void> | null {
    return this.detail.result;
  }

  setResult(result: Promise<void> | null): PostChangePasswordEvent {
    this.detail.result = result;
    return this;
  }
}

export { PostChangePasswordEvent, PostChangePasswordEventDetails };
