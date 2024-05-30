import { expect } from 'chai';
import { DateTime } from 'luxon';
import { SinonSandbox, SinonStubbedInstance, createSandbox } from 'sinon';
import { Container } from 'typedi';

import { Logger, RawValueToNormalizedValueHelper } from '../../../src/Service';
import { Data } from '../../../src/Type/Definition';

describe('RawValueToNormalizedValueHelper tests', () => {
  let sandbox: SinonSandbox;
  let mockedLogger: SinonStubbedInstance<Logger>;

  beforeEach(() => {
    sandbox = createSandbox();

    mockedLogger = sandbox.createStubInstance(Logger);
    Container.set(Logger, mockedLogger);
  });

  afterEach(() => {
    sandbox.restore();
    Container.reset();
  });

  it('should normalize raw data', async () => {
    const rawData: Data = {
      string: 'some string',
      int: 1234,
      float: 5.678,
      datetime: '2023-10-25T10:44:39+00:00',
    };

    const normalizedData = Container.get(RawValueToNormalizedValueHelper).parseRawData(rawData);

    expect(normalizedData.string).to.equal('some string');
    expect(normalizedData.int).to.equal(1234);
    expect(normalizedData.float).to.equal(5.678);
    expect(DateTime.fromJSDate(<Date>normalizedData.datetime).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")).to.equal(
      '2023-10-25T10:44:39+00:00',
    );
  });
});
