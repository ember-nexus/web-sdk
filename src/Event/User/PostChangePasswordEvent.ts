import { Data } from '~/Type/Definition/Data';
import { EventIdentifier } from '~/Type/Enum/EventIdentifierEnum';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type PostChangePasswordEventDetails = {
  currentPassword: string;
  newPassword: string;
  data: Data;
  result: Promise<void> | null;
};

class PostChangePasswordEvent extends CustomEvent<PostChangePasswordEventDetails> {
  constructor(currentPassword: string, newPassword: string, data: Data = {}) {
    super(EventIdentifier.PostChangePassword, {
      ...customEventDefaultInit,
      detail: {
        currentPassword: currentPassword,
        newPassword: newPassword,
        data: data,
        result: null,
      },
    });
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
