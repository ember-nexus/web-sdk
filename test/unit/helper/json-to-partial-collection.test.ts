import { expect } from 'chai';

import { jsonToPartialCollection } from '../../../src/helper/json-to-partial-collection.js';

describe('jsonToPartialCollection tests', () => {
  it('should create valid partial collection from valid data', () => {
    const resultPartialCollection = jsonToPartialCollection({
      type: '_PartialCollection',
      id: '/',
      totalNodes: 3,
      links: {
        first: '/',
        previous: null,
        next: null,
        last: '/',
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
    expect(resultPartialCollection).to.eql({
      type: '_PartialCollection',
      id: '/',
      totalNodes: 3,
      links: {
        first: '/',
        previous: null,
        next: null,
        last: '/',
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
    expect(resultPartialCollection.nodes).to.be.length(3);
    expect(resultPartialCollection.relations).to.be.length(2);
  });

  it('should create valid empty partial collection from valid empty data', () => {
    const resultPartialCollection = jsonToPartialCollection({
      type: '_PartialCollection',
      id: '/',
      totalNodes: 0,
      links: {
        first: '/',
        previous: null,
        next: null,
        last: '/',
      },
      nodes: [],
      relations: [],
    });
    expect(resultPartialCollection).to.eql({
      type: '_PartialCollection',
      id: '/',
      totalNodes: 0,
      links: {
        first: '/',
        previous: null,
        next: null,
        last: '/',
      },
      nodes: [],
      relations: [],
    });
    expect(resultPartialCollection.nodes).to.be.length(0);
    expect(resultPartialCollection.relations).to.be.length(0);
  });

  it('should throw error when type is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'type'");
  });

  it('should throw error when type is incorrect', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollectionTest',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object is not of type '_PartialCollection'");
  });

  it('should throw error when id is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'id'");
  });

  it('should throw error when totalNodes is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'totalNodes'");
  });

  it('should throw error when links is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'links'");
  });

  it('should throw error when links.first is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'links.first'");
  });

  it('should throw error when links.previous is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'links.previous'");
  });

  it('should throw error when links.next is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          last: '/',
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'links.next'");
  });

  it('should throw error when links.last is missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
        },
        nodes: [],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'links.last'");
  });

  it('should throw error when nodes are missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'nodes'");
  });

  it('should throw error when relations are missing', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'relations'");
  });

  it('should pass error when node has error', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [
          {
            id: 'ba9fceb7-32f0-476e-af47-0e69396cf674',
            data: {
              some: 'data',
            },
          },
        ],
        relations: [],
      });
    }).to.throw(Error, "Data object does not contain property with name 'type'");
  });

  it('should pass error when relation has error', () => {
    expect(() => {
      jsonToPartialCollection({
        type: '_PartialCollection',
        id: '/',
        totalNodes: 0,
        links: {
          first: '/',
          previous: null,
          next: null,
          last: '/',
        },
        nodes: [],
        relations: [
          {
            id: '58f87378-bf72-40c4-a89f-d3d86c29a241',
            start: '2ac398e7-f2e2-44a7-a041-bc45b3f88358',
            end: '81771a82-b82b-407a-a7a6-ceec5835f260',
            data: {
              some: 'data',
            },
          },
        ],
      });
    }).to.throw(Error, "Data object does not contain property with name 'type'");
  });
});
