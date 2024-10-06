import { expect } from 'chai';

import { GetInstanceConfigurationEvent } from '../../../../src/BrowserEvent/System';
import type { InstanceConfiguration } from '../../../../src/Type/Definition';

describe('GetInstanceConfigurationEvent tests', () => {
  test('GetInstanceConfigurationEvent returns correct type', () => {
    expect(GetInstanceConfigurationEvent.type).to.equal('ember-nexus-sdk-get-instance-configuration');
  });

  it('should return null when no result was set', () => {
    const getInstanceConfigurationEvent = new GetInstanceConfigurationEvent();

    expect(getInstanceConfigurationEvent.getInstanceConfiguration()).to.be.null;
  });

  it('should return promise when result was set', () => {
    const getInstanceConfigurationEvent = new GetInstanceConfigurationEvent();

    const instanceConfiguration: InstanceConfiguration = {
      version: 'version',
      pageSize: {
        min: 5,
        default: 25,
        max: 100,
      },
      register: {
        enabled: true,
        uniqueIdentifier: 'email',
        uniqueIdentifierRegex: false,
      },
    };

    const promise = new Promise<InstanceConfiguration>((resolve): void => {
      resolve(instanceConfiguration);
    });

    getInstanceConfigurationEvent.setInstanceConfiguration(promise);

    expect(getInstanceConfigurationEvent.getInstanceConfiguration()).to.equal(promise);
  });
});
