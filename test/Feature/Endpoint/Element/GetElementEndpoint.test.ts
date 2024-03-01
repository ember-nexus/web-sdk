import { expect } from 'chai';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { SinonSandbox, SinonStubbedInstance, assert, createSandbox } from 'sinon';
import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { Logger } from '~/Service/Logger';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Token, validateTokenFromString } from '~/Type/Definition/Token';
import { validateUuidFromString } from '~/Type/Definition/Uuid';

const server = setupServer(
  http.get('http://mock-api/b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5', () => {
    return HttpResponse.json({
      type: 'Data',
      id: 'b1e85bf9-6a79-4e50-ae5a-ed49beac8cb5',
      data: {
        created: '2023-10-06T20:27:56+00:00',
        updated: '2023-10-06T20:27:56+00:00',
        name: 'Test Data',
      },
    });
  }),
);

describe('GetElementEndpoint tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  const _token: Token = validateTokenFromString('secret-token:Au6srY6s3cW5THS6LeCl9Z');

  beforeEach(() => {
    sandbox = createSandbox();

    server.listen();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);

    Container.get(WebSdkConfiguration).setApiHost('http://mock-api');
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
    server.resetHandlers();
  });

  afterEach(() => {
    server.close();
  });

  it('should load an accessible node', async () => {
    Container.get(WebSdkConfiguration).setToken(_token);

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
    expect((node.data as any).created).to.be.instanceof(Date);
    expect((node.data as any).updated).to.be.instanceof(Date);
    expect(Object.keys(node.data)).to.have.lengthOf(3);
  });
});
