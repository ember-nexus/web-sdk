import { expect } from 'chai';

import { jsonToNode } from '../../../src/helper/json-to-node.js';

describe('jsonToNode tests', () => {
  it('should create valid node from valid data', () => {
    const resultNode = jsonToNode({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
    expect(resultNode).to.eql({
      type: 'Node',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      data: {
        some: 'data',
      },
    });
  });

  it('should throw error when type is missing', () => {
    expect(() => {
      jsonToNode({
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      });
    }).to.throw(Error, "Data object does not contain property with name 'type'.");
  });

  it('should throw error when id is missing', () => {
    expect(() => {
      jsonToNode({
        type: 'Node',
        data: {
          some: 'data',
        },
      });
    }).to.throw(Error, "Data object does not contain property with name 'id'.");
  });

  it('should throw error when data is missing', () => {
    expect(() => {
      jsonToNode({
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      });
    }).to.throw(Error, "Data object does not contain property with name 'data'.");
  });

  it('should throw error when data is empty', () => {
    expect(() => {
      jsonToNode({});
    }).to.throw(Error, "Data object does not contain property with name 'type'.");
  });
});
