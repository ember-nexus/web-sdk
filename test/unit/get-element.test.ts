import { getElement } from '../../src/endpoint/get-element.js';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

describe('getElement tests', () => {
  it('should load an existing element from the api', async () => {
    sinon.stub(axios, 'get').resolves({
      data: {
        type: 'Node',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        data: {
          some: 'data',
        },
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const resultNode = await getElement(
      'c52569b7-1dd8-4018-9c3b-a710abd6982d',
    ).then((node) => {
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
});
