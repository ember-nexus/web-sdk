import { InstanceConfiguration } from '../../Type/Definition/index.js';
import { EventIdentifier } from '../../Type/Enum/index.js';
import { customEventDefaultInit } from '../../Type/Partial/index.js';

type GetInstanceConfigurationEventDetails = {
  instanceConfiguration: Promise<InstanceConfiguration> | null;
};

class GetInstanceConfigurationEvent extends CustomEvent<GetInstanceConfigurationEventDetails> {
  public static type = EventIdentifier.GetInstanceConfiguration;
  constructor() {
    super(EventIdentifier.GetInstanceConfiguration, {
      ...customEventDefaultInit,
      detail: {
        instanceConfiguration: null,
      },
    });
  }

  getInstanceConfiguration(): Promise<InstanceConfiguration> | null {
    return this.detail.instanceConfiguration;
  }

  setInstanceConfiguration(
    instanceConfiguration: Promise<InstanceConfiguration> | null,
  ): GetInstanceConfigurationEvent {
    this.detail.instanceConfiguration = instanceConfiguration;
    return this;
  }
}

export { GetInstanceConfigurationEvent, GetInstanceConfigurationEventDetails };
