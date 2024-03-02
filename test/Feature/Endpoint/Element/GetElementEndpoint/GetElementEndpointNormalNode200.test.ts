import { expect } from 'chai';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

import { mockServer } from '../../../../MockServer/mockServer';

describe('GetElementEndpoint tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  beforeEach(() => {
    sandbox = createSandbox();

    mockServer.listen();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);

    Container.get(WebSdkConfiguration).setApiHost('http://mock-api');
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
    mockServer.close();
  });

  it('should load an accessible node', async () => {
    const nodeUuid = validateUuidFromString('b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5');
    const node = await Container.get(GetElementEndpoint).getElement(nodeUuid);

    assert.calledOnceWithExactly(
      mockedLogger.debug,
      'Executing HTTP GET request against url http://mock-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5 .',
    );

    expect(node).to.have.keys('id', 'type', 'data');
    expect(node).to.not.have.keys('start', 'end');
    expect(node.id).to.equal(nodeUuid);
    expect(node.type).to.equal('Data');
    expect(node.data.created).to.be.instanceof(Date);
    expect(node.data.updated).to.be.instanceof(Date);
    expect(Object.keys(node.data)).to.have.lengthOf(3);
  });
});
