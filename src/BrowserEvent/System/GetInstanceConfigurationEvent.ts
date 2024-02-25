import { InstanceConfiguration } from '~/Type/Definition/InstanceConfiguration';
import { EventIdentifier } from '~/Type/Enum/EventIdentifier';
import { customEventDefaultInit } from '~/Type/Partial/CustomEventDefaultInit';

type GetInstanceConfigurationEventDetails = {
  result: Promise<InstanceConfiguration> | null;
};

class GetInstanceConfigurationEvent extends CustomEvent<GetInstanceConfigurationEventDetails> {
  constructor() {
    super(EventIdentifier.GetInstanceConfiguration, {
      ...customEventDefaultInit,
      detail: {
        result: null,
      },
    });
  }

  getResult(): Promise<InstanceConfiguration> | null {
    return this.detail.result;
  }

  setResult(result: Promise<InstanceConfiguration> | null): GetInstanceConfigurationEvent {
    this.detail.result = result;
    return this;
  }
}

export { GetInstanceConfigurationEvent, GetInstanceConfigurationEventDetails };
