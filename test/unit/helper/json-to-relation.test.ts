import { jsonToRelation } from '../../../src/helper/json-to-relation.js';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('jsonToRelation tests', () => {
  it('should create valid relation from valid data', async () => {
    const resultRelation = await jsonToRelation({
      type: 'RELATION',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
      end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
      data: {
        some: 'data',
      },
    }).then((node) => {
      return node;
    });
    expect(resultRelation).to.eql({
      type: 'RELATION',
      id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
      start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
      end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
      data: {
        some: 'data',
      },
    });
  });

  it('should throw error when type is missing', async () => {
    await expect(
      jsonToRelation({
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
        end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'type'",
    );
  });

  it('should throw error when id is missing', async () => {
    await expect(
      jsonToRelation({
        type: 'RELATION',
        start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
        end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'id'",
    );
  });

  it('should throw error when start is missing', async () => {
    await expect(
      jsonToRelation({
        type: 'RELATION',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'start'",
    );
  });

  it('should throw error when end is missing', async () => {
    await expect(
      jsonToRelation({
        type: 'RELATION',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
        data: {
          some: 'data',
        },
      }),
    ).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'end'",
    );
  });

  it('should throw error when data is missing', async () => {
    await expect(
      jsonToRelation({
        type: 'RELATION',
        id: 'c52569b7-1dd8-4018-9c3b-a710abd6982d',
        start: 'b6224020-8e04-43d8-b9ae-71f11587405b',
        end: '78223fa3-e20c-4952-99c3-ca6b814af6b9',
      }),
    ).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'data'",
    );
  });

  it('should throw error when data is empty', async () => {
    await expect(jsonToRelation({})).to.be.rejectedWith(
      Error,
      "Data object does not contain property with name 'type'",
    );
  });
});
