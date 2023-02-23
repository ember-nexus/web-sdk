import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import axios from 'axios';
import { getChildren } from '../../../src/endpoint/get-children.js';

describe('getChildren tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should load existing elements from the api', async () => {
    sandbox.stub(axios, 'get').resolves({
      data: {
        type: '_PartialCollection',
        id: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
        totalNodes: 3,
        links: {
          first: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
          previous: null,
          next: null,
          last: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
        },
        nodes: [
          {
            type: 'Node',
            id: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {
              some: 'data',
            },
          },
          {
            type: 'Node',
            id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {
              some: 'data',
            },
          },
        ],
        relations: [
          {
            type: 'RELATION',
            id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
            start: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
            end: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {
              some: 'data',
            },
          },
          {
            type: 'RELATION',
            id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
            start: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
            end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {
              some: 'data',
            },
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const resultPartialCollection = await getChildren('038d928d-717e-4615-a52b-b48ad9aaf50b').then(
      (partialCollection) => {
        return partialCollection;
      },
    );

    expect(resultPartialCollection).to.eql({
      type: '_PartialCollection',
      id: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
      totalNodes: 3,
      links: {
        first: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
        previous: null,
        next: null,
        last: '/038d928d-717e-4615-a52b-b48ad9aaf50b/children?page=1&pageSize=25',
      },
      nodes: [
        {
          type: 'Node',
          id: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
          data: {
            some: 'data',
          },
        },
        {
          type: 'Node',
          id: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {
            some: 'data',
          },
        },
        {
          type: 'Node',
          id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {
            some: 'data',
          },
        },
      ],
      relations: [
        {
          type: 'RELATION',
          id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
          start: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
          end: '81771a82-b82b-407a-a7a6-ceec5835f260',
          data: {
            some: 'data',
          },
        },
        {
          type: 'RELATION',
          id: '40ce6aec-0dad-4ebf-8963-db1512c02274',
          start: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
          end: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
          data: {
            some: 'data',
          },
        },
      ],
    });
  });
});
