import { jsonToNode } from '../../../src/helper/json-to-node.js';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('jsonToNode tests', () => {
  it('should create valid node from valid data', async () => {
    const resultNode = await jsonToNode({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    }).then((node) => {
      return node;
    });
    expect(resultNode).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
  });

  it('should throw error when type is missing', async () => {
    await expect(
      jsonToNode({
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(Error, "Data object does not contain property with name 'type'");
  });

  it('should throw error when id is missing', async () => {
    await expect(
      jsonToNode({
        type: 'Node',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(Error, "Data object does not contain property with name 'id'");
  });

  it('should throw error when data is missing', async () => {
    await expect(
      jsonToNode({
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      }),
    ).to.be.rejectedWith(Error, "Data object does not contain property with name 'data'");
  });

  it('should throw error when data is empty', async () => {
    await expect(jsonToNode({})).to.be.rejectedWith(Error, "Data object does not contain property with name 'type'");
  });
});
